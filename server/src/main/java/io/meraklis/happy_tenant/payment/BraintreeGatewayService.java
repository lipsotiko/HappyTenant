package io.meraklis.happy_tenant.payment;

import com.braintreegateway.BraintreeGateway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BraintreeGatewayService {

    @Value("${braintree.environment}")
    private String environment;

    @Value("${braintree.merchant_id}")
    private String merchantId;

    @Value("${braintree.public_key}")
    private String publicKey;

    @Value("${braintree.private_key}")
    private String privateKey;

    public BraintreeGateway gateway() {
        return new BraintreeGateway(
                environment,
                merchantId,
                publicKey,
                privateKey
        );
    }

}