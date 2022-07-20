package io.meraklis.happy_tenant.tenant;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TenantMetadata {
    private String customerId;
    private String subscriptionId;
}
