package io.meraklis.happy_tenant.payment;

import com.braintreegateway.CreditCard;
import com.braintreegateway.Customer;
import com.braintreegateway.Result;
import com.braintreegateway.Transaction;
import com.braintreegateway.Transaction.Status;
import com.braintreegateway.TransactionRequest;
import com.braintreegateway.ValidationError;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private BraintreeGatewayService gatewayService;

    private final Status[] TRANSACTION_SUCCESS_STATUSES = new Status[]{
            Transaction.Status.AUTHORIZED,
            Transaction.Status.AUTHORIZING,
            Transaction.Status.SETTLED,
            Transaction.Status.SETTLEMENT_CONFIRMED,
            Transaction.Status.SETTLEMENT_PENDING,
            Transaction.Status.SETTLING,
            Transaction.Status.SUBMITTED_FOR_SETTLEMENT
    };

    @GetMapping(value = "/generate-client-token")
    public Map<String, String> checkout() {
        return Collections.singletonMap("token", gatewayService.gateway().clientToken().generate());
    }

    @PostMapping(value = "/checkouts")
    public String postForm(@RequestParam("amount") String amount, @RequestParam("paymentMethodNonce") String nonce)
            throws Exception {
        BigDecimal decimalAmount;
        decimalAmount = new BigDecimal(amount);

        TransactionRequest request = new TransactionRequest()
                .amount(decimalAmount)
                .paymentMethodNonce(nonce)
                .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> result = gatewayService.gateway().transaction().sale(request);

        if (result.isSuccess() || result.getTransaction() != null) {
            Transaction transaction = result.getTarget();
            return transaction.getId();
        } else {
            StringBuilder errorString = new StringBuilder();
            for (ValidationError error : result.getErrors().getAllDeepValidationErrors()) {
                errorString.append("Error: ").append(error.getCode()).append(": ").append(error.getMessage())
                        .append("\n");
            }
            throw new Exception(errorString.toString());
        }
    }

    @GetMapping(value = "/checkouts/{transactionId}")
    public Map<String, Object> getTransaction(@PathVariable String transactionId) {
        Transaction transaction;
        CreditCard creditCard;
        Customer customer;

        try {
            transaction = gatewayService.gateway().transaction().find(transactionId);
            creditCard = transaction.getCreditCard();
            customer = transaction.getCustomer();
        } catch (Exception e) {
            System.out.println("Exception: " + e);
            return null;
        }

        Map<String, Object> transactionResults = new HashMap<>();
        transactionResults.put("isSuccess",
                Arrays.asList(TRANSACTION_SUCCESS_STATUSES).contains(transaction.getStatus()));
        transactionResults.put("transaction", transaction);
        transactionResults.put("creditCard", creditCard);
        transactionResults.put("customer", customer);

        return transactionResults;
    }
}
