package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.email.EmailService;
import io.meraklis.happy_tenant.util.EmailValidationService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@Configuration
@RepositoryEventHandler
public class TenantEventHandler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailValidationService emailValidationBuilder;

    @HandleBeforeCreate
    public void handleBeforeCreate(Tenant tenant) {
        tenant.setEmail(emailValidationBuilder.cleanAddress(tenant.getEmail()));
    }

    @HandleAfterCreate
    public void handleAfterCreate(Tenant tenant) throws IOException {
        emailService.sendInvite(tenant);
    }

}
