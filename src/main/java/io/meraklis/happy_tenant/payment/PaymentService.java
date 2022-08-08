package io.meraklis.happy_tenant.payment;

import com.stripe.model.Invoice;
import java.time.LocalDate;
import java.util.List;

public interface PaymentService {

    String createAccount(String email);

    String createProduct(String description, String accountId);

    String createPrice(Double price, String productId, String accountId, Boolean recurringMonthly);

    Long getPrice(String priceId, String accountId);

    String createCustomer(String email, String name);

    String createCustomer(String email, String name, String accountId);

    PaymentAccountStatus getAccountStatus(String accountId, String returnPath);

    String createSubscription(String customerId, String priceId);

    void createSubscription(String customerId, String priceId, LocalDate billingCycleAnchor, String accountId);

    void createInvoice(String description, LocalDate dueDate, String customerId, String accountId);

    void createInvoiceItem(String productName, Double securityDeposit, String customerId, String accountId);

    List<Invoice> getCustomerInvoices(String customerId, String accountId);
}
