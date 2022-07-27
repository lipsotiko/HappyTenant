package io.meraklis.happy_tenant.user.landlord;

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
    private LandlordUserService landlordUserService;

    @HandleBeforeCreate
    public void handleBeforeCreate(LandlordUser landlordUser) {
        landlordUserService.createPaymentAccounts(landlordUser);
    }

    @HandleAfterCreate
    public void handleAfterCreate(LandlordUser landlordUser) {
        landlordUserService.setAccountStatus(landlordUser);
    }

    @HandleBeforeDelete
    @PreAuthorize("hasPermission(#landlordUser, 'ADMIN')")
    public void handleBeforeDelete(LandlordUser landlordUser) {
        landlordUserService.deleteAccount(landlordUser);
    }

}
