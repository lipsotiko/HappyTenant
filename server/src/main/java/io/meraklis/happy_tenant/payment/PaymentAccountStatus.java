package io.meraklis.happy_tenant.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentAccountStatus {
    private String accountId;
    private Boolean isOnboarded;
    private String onboardingUrl;
    private String loginUrl;
    private String customerId;
}
