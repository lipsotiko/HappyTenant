package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.security.AbstractAuditor;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Landlord extends AbstractAuditor implements Serializable {

    private String fullName;
    private String organization;
}
