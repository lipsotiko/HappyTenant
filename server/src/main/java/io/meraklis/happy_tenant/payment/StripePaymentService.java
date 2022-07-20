package io.meraklis.happy_tenant.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.Customer;
import com.stripe.model.LoginLink;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.Subscription;
import com.stripe.net.RequestOptions;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.PriceCreateParams.Recurring;
import com.stripe.param.PriceCreateParams.Recurring.Interval;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionCreateParams.PaymentSettings.PaymentMethodType;
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

    public String createAccount(String email) {
        Map<String, Object> params = new HashMap<>();
        params.put("type", "express");
        params.put("country", "US");
        params.put("email", email);
        params.put("capabilities", buildCapabilities());
        Account account;
        try {
            account = Account.create(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
        return account.getId();
    }

    @Override
    public String createProduct(String description) {
        Map<String, Object> params = new HashMap<>();
        params.put("name", description);
        try {
            return Product.create(params).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
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
    public void deactivateProduct(String productId) {
        if (productId == null) {
            return;
        }
        try {
            Product product = Product.retrieve(productId);
            Map<String, Object> params = new HashMap<>();
            params.put("active", false);
            product.update(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deactivateProduct(String productId, String accountId) {
        if (productId == null) {
            return;
        }
        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            Product product = Product.retrieve(productId, requestOptions);
            Map<String, Object> params = new HashMap<>();
            params.put("active", false);
            product.update(params, requestOptions);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createPrice(Double price, String productId) {
        try {
            return Price.create(priceCreateParams(price, productId)).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createPrice(Double price, String productId, String accountId) {
        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            return Price.create(priceCreateParams(price, productId), requestOptions).getId();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    private PriceCreateParams priceCreateParams(Double price, String productId) {
        Map<String, Object> params = new HashMap<>();
        params.put("unit_amount", (int) Math.ceil(price * 100));
        params.put("currency", "usd");
        params.put("product", productId);

        return PriceCreateParams.builder().putAllExtraParam(params)
                .setRecurring(Recurring.builder().setInterval(Interval.MONTH).build()).build();
    }

    @Override
    public void deactivatePrice(String priceId) {
        if (priceId == null) {
            return;
        }
        try {
            Price price = Price.retrieve(priceId);
            Map<String, Object> params = new HashMap<>();
            params.put("active", false);
            price.update(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deactivatePrice(String priceId, String accountId) {
        RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();

    }

    @Override
    public void deleteCustomer(String paymentCustomerId) {
        if (paymentCustomerId == null) {
            return;
        }
        try {
            Customer.retrieve(paymentCustomerId).delete();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteCustomer(String paymentCustomerId, String accountId) {
        if (paymentCustomerId == null) {
            return;
        }
        try {
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            Customer.retrieve(paymentCustomerId, requestOptions).delete();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteAccount(String accountId) {
        if (accountId == null) {
            return;
        }
        try {
            Account account = Account.retrieve(accountId);
            account.delete();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
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
    public String createSubscription(String customerId, String priceId, String accountId) {
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
            RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(accountId).build();
            return Subscription.create(subCreateParams, requestOptions).getId();
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

    private Map<String, Object> buildCapabilities() {
        Map<String, Object> capabilities = new HashMap<>();
        capabilities.put("card_payments", requestCapability());
        capabilities.put("transfers", requestCapability());
        capabilities.put("us_bank_account_ach_payments", requestCapability());
        return capabilities;
    }

    private Map<String, Object> requestCapability() {
        Map<String, Object> params = new HashMap<>();
        params.put("requested", true);
        return params;
    }

}
