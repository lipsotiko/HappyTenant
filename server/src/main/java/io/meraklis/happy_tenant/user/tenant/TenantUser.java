package io.meraklis.happy_tenant.user.tenant;

import io.meraklis.happy_tenant.security.AbstractAuditor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TenantUser extends AbstractAuditor {
    private String fullName;
    private String email;
}
