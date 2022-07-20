package io.meraklis.happy_tenant.property;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentProductMetadata {

    private String accountId;
    private String productId;
    private String priceId;
}
