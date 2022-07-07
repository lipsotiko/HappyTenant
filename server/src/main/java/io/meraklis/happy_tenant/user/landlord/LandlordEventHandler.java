package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.access.prepost.PreAuthorize;

@Configuration
@RepositoryEventHandler
public class LandlordEventHandler {

    @Autowired
    private SecurityService securityService;

    @HandleBeforeDelete
    @PreAuthorize("hasPermission(#landlord, 'ADMIN')")
    public void handleBeforeDelete(Landlord landlord) {
        securityService.deleteUser(landlord.getCreatedBy());
    }

}
