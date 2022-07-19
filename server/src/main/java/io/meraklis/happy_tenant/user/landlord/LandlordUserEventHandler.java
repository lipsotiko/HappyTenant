package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.access.prepost.PreAuthorize;

@Configuration
@RepositoryEventHandler
public class LandlordUserEventHandler {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CurrentUserAuditor currentUserAuditor;

    @HandleBeforeCreate
    public void handleBeforeCreate(LandlordUser landlordUser) {
        currentUserAuditor.getCurrentAuditor().ifPresent(email -> {
            String accountId = paymentService.createAccount(email);
            landlordUser.setPaymentAccountId(accountId);
        });
    }

    @HandleAfterCreate
    public void handleAfterCreate(LandlordUser landlordUser) {
        landlordUser.setPaymentAccountStatus(
                paymentService.getAccountStatus(landlordUser.getPaymentAccountId(), "/profile"));
    }

    @HandleBeforeDelete
    @PreAuthorize("hasPermission(#landlordUser, 'ADMIN')")
    public void handleBeforeDelete(LandlordUser landlordUser) {
        paymentService.deleteAccount(landlordUser.getPaymentAccountId());
        securityService.deleteUser(landlordUser.getCreatedBy());
    }

}
