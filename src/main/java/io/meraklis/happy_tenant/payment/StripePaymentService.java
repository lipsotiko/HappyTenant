package io.meraklis.happy_tenant.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceItem;
import com.stripe.model.LoginLink;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.Subscription;
import com.stripe.net.RequestOptions;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountCreateParams.BusinessProfile;
import com.stripe.param.AccountCreateParams.Capabilities;
import com.stripe.param.AccountCreateParams.Capabilities.CardPayments;
import com.stripe.param.AccountCreateParams.Capabilities.Transfers;
import com.stripe.param.AccountCreateParams.Capabilities.UsBankAccountAchPayments;
import com.stripe.param.AccountCreateParams.Type;
import com.stripe.param.InvoiceCreateParams;
import com.stripe.param.InvoiceCreateParams.CollectionMethod;
import com.stripe.param.InvoiceItemCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.PriceCreateParams.Recurring;
import com.stripe.param.PriceCreateParams.Recurring.Interval;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionCreateParams.PaymentSettings.PaymentMethodType;
import com.stripe.param.SubscriptionCreateParams.ProrationBehavior;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentService implements PaymentService {

    @Value("${stripe.private-key}")
    private String apiKey;

    @Value("${tenant-portal-url}")
    private String tenantPortalUrl;

    @Value("${landlord-portal-url}")
    private String landlordPortalUrl;

    @PostConstruct
    public void runAfterCreated() {
        Stripe.apiKey = apiKey;
    }

    /**
     * https://stripe.com/docs/connect/setting-mcc#list real_estate_agents_and_managers_rentals 6513
     */

    public String createAccount(String email) {
        AccountCreateParams params = AccountCreateParams
                .builder()
                .setCountry("US")
                .setType(Type.EXPRESS)
                .setEmail(email)
                .setCapabilities(Capabilities.builder()
                        .setCardPayments(CardPayments.builder().setRequested(true).build())
                        .setTransfers(Transfers.builder().setRequested(true).build())
                        .setUsBankAccountAchPayments(UsBankAccountAchPayments.builder().setRequested(true).build())
                        .build())
                .setBusinessProfile(
                        BusinessProfile.builder().setProductDescription("Property management").setMcc("6513").build()
                ).build();
        Account account;
        try {
            account = Account.create(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
        return account.getId();
    }

    @Override
    public String createProduct(String description, String accountId) {
        Map<String, Object> params = new HashMap<>();
        params.put("name", description);
        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            return Product.create(params, requestOptions).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createPrice(Double price, String productId, String accountId, Boolean recurringMonthly) {
        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            return Price.create(priceCreateParams(price, productId, recurringMonthly), requestOptions).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    private PriceCreateParams priceCreateParams(Double price, String productId, Boolean recurringMonthly) {
        Map<String, Object> params = new HashMap<>();
        params.put("unit_amount", (int) Math.ceil(price * 100));
        params.put("currency", "usd");
        params.put("product", productId);

        if (recurringMonthly) {
            return PriceCreateParams.builder().putAllExtraParam(params)
                    .setRecurring(Recurring.builder().setInterval(Interval.MONTH).build()).build();
        }

        return PriceCreateParams.builder().putAllExtraParam(params).build();
    }

    @Override
    public PaymentAccountStatus getAccountStatus(String accountId, String returnPath) {
        if (accountId == null) {
            return new PaymentAccountStatus();
        }
        try {
            Account account = Account.retrieve(accountId);
            Boolean isOnboarded = account.getRequirements().getCurrentlyDue().isEmpty();

            return PaymentAccountStatus.builder()
                    .accountId(account.getId())
                    .isOnboarded(isOnboarded)
                    .loginUrl((isOnboarded) ? createLoginLink(account.getId()) : null)
                    .onboardingUrl((!isOnboarded) ? createOnBoardingLink(account.getId(), returnPath) : null)
                    .build();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createSubscription(String customerId, String priceId) {
        SubscriptionCreateParams subCreateParams = SubscriptionCreateParams.builder()
                .setCustomer(customerId)
                .addItem(
                        SubscriptionCreateParams
                                .Item.builder()
                                .setPrice(priceId)
                                .build()
                )
                .setPaymentBehavior(
                        SubscriptionCreateParams.PaymentBehavior.DEFAULT_INCOMPLETE
                )
                .setPaymentSettings(
                        SubscriptionCreateParams.PaymentSettings.builder()
                                .addPaymentMethodType(PaymentMethodType.US_BANK_ACCOUNT)
                                .build()
                )
                .build();

        try {
            return Subscription.create(subCreateParams).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createSubscription(String customerId, String priceId, LocalDate billingCycleAnchor, String accountId) {
        SubscriptionCreateParams subCreateParams = SubscriptionCreateParams.builder()
                .setCustomer(customerId)
                .addItem(
                        SubscriptionCreateParams
                                .Item.builder()
                                .setPrice(priceId)
                                .build()
                )
                .setDaysUntilDue(30L)
                .setProrationBehavior(ProrationBehavior.NONE)
                .setCollectionMethod(SubscriptionCreateParams.CollectionMethod.SEND_INVOICE)
                .setBillingCycleAnchor(billingCycleAnchor.atStartOfDay().toEpochSecond(ZoneOffset.UTC))
                .setPaymentBehavior(
                        SubscriptionCreateParams.PaymentBehavior.DEFAULT_INCOMPLETE
                )
                .setPaymentSettings(
                        SubscriptionCreateParams.PaymentSettings.builder()
                                .addPaymentMethodType(PaymentMethodType.US_BANK_ACCOUNT)
                                .build()
                )
                .build();

        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            Subscription.create(subCreateParams, requestOptions);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    public void createInvoice(String description, LocalDate dueDate, String customerId, String accountId) {
        RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
        try {
            InvoiceCreateParams createParams = InvoiceCreateParams
                    .builder()
                    .setCustomer(customerId)
                    .setDescription(description)
                    .setCollectionMethod(CollectionMethod.SEND_INVOICE)
                    .setDueDate(dueDate.atStartOfDay().toEpochSecond(ZoneOffset.UTC))
                    .build();
            Invoice.create(createParams, requestOptions);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createInvoiceItem(String productName, Double securityDeposit, String customerId, String accountId) {
        RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
        String productId = createProduct(productName, accountId);
        String priceId = createPrice(securityDeposit, productId, accountId, false);
        InvoiceItemCreateParams createParams = InvoiceItemCreateParams.builder().setCustomer(customerId)
                .setPrice(priceId).build();
        try {
            InvoiceItem.create(createParams, requestOptions);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createCustomer(String email) {
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        try {
            Customer customer = Customer.create(params);
            return customer.getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createCustomer(String email, String accountId) {
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            Customer customer = Customer.create(params, requestOptions);
            return customer.getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    private String createOnBoardingLink(String accountId, String returnPath) {
        Map<String, Object> params = new HashMap<>();
        params.put("account", accountId);
        params.put(
                "refresh_url",
                landlordPortalUrl + "/login"
        );
        params.put(
                "return_url",
                landlordPortalUrl + returnPath
        );
        params.put("type", "account_onboarding");

        try {
            AccountLink accountLink =
                    AccountLink.create(params);
            return accountLink.getUrl();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    private String createLoginLink(String accountId) {
        try {
            LoginLink loginLink = LoginLink.createOnAccount(accountId, Collections.emptyMap(), null);
            return loginLink.getUrl();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

}
