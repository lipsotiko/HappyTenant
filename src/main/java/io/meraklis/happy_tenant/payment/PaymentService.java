package io.meraklis.happy_tenant.payment;

public interface PaymentService {

    String createAccount(String email);

    void deleteAccount(String accountId);

    PaymentAccountStatus getAccountStatus(String accountId, String returnPath);
}
