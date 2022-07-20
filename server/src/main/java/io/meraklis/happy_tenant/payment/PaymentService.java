package io.meraklis.happy_tenant.payment;

public interface PaymentService {

    String createAccount(String email);

    void deleteAccount(String accountId);

    String createProduct(String description);

    String createProduct(String description, String accountId);


    void deactivateProduct(String productId);

    void deactivateProduct(String productId, String accountId);


    String createPrice(Double price, String productId);

    String createPrice(Double price, String productId, String accountId);


    void deactivatePrice(String priceId);

    void deactivatePrice(String priceId, String accountId);


    String createCustomer(String email);

    String createCustomer(String email, String accountId);


    void deleteCustomer(String paymentCustomerId);

    void deleteCustomer(String paymentCustomerId, String accountId);


    PaymentAccountStatus getAccountStatus(String accountId, String returnPath);

    String createSubscription(String customerId, String priceId);

    String createSubscription(String customerId, String priceId, String accountId);

}
