package io.meraklis.happy_tenant.payment;

import java.time.LocalDate;

public interface PaymentService {

    String createAccount(String email);

    String createProduct(String description, String accountId);

    String createPrice(Double price, String productId, String accountId, Boolean recurringMonthly);

    String createCustomer(String email);

    String createCustomer(String email, String accountId);

    PaymentAccountStatus getAccountStatus(String accountId, String returnPath);

    String createSubscription(String customerId, String priceId);

    void createSubscription(String customerId, String priceId, LocalDate billingCycleAnchor, String accountId);

    void createInvoice(String description, LocalDate dueDate, String customerId, String accountId);

    void createInvoiceItem(String productName, Double securityDeposit, String customerId, String accountId);
}
