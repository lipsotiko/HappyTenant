package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.property.Property;
import io.meraklis.happy_tenant.security.AbstractAuditor;
import javax.persistence.Transient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Tenant extends AbstractAuditor {

    private String propertyId;
    private String fullName;
    private String email;

    @Transient
    private Property property;
}
