package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.payment.PaymentAccountStatus;
import io.meraklis.happy_tenant.security.AbstractAuditor;
import java.io.Serializable;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LandlordUser extends AbstractAuditor implements Serializable {

    private String fullName;
    private String organization;
    private String paymentAccountId;

    @Transient
    private PaymentAccountStatus paymentAccountStatus;
}
