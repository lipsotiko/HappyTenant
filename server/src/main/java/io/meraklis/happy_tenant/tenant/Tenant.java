package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.property.Property;
import io.meraklis.happy_tenant.security.AbstractAuditor;
import java.time.LocalDate;
import javax.persistence.Transient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Tenant extends AbstractAuditor {

    private String propertyId;
    private String fullName;
    private String email;
    private LocalDate moveInDate;
    private LocalDate billingStartDate;
    private Boolean createMonthlySubscription;
    private Boolean addProratedFirstMonthsRent;
    private Boolean addLastMonthsRentToInvoice;
    private Boolean addSecurityDepositToInvoice;
    private Double securityDeposit;
    private String paymentCustomerId;

    @Transient
    private Property property;
}
