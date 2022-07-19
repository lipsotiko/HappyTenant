package io.meraklis.happy_tenant.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.LoginLink;
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
