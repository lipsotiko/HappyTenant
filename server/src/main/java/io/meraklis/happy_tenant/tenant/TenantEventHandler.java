package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.email.EmailService;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.property.PropertyRepository;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.user.landlord.LandlordUser;
import io.meraklis.happy_tenant.user.landlord.LandlordUserRepository;
import io.meraklis.happy_tenant.util.EmailValidationService;
import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@Configuration
@RepositoryEventHandler
public class TenantEventHandler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailValidationService emailValidationBuilder;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private LandlordUserRepository landlordUserRepository;
    @Autowired
    private CurrentUserAuditor currentUserAuditor;

    @HandleBeforeCreate
    public void handleBeforeCreate(Tenant tenant) {
        currentUserAuditor.getCurrentAuditor().ifPresent(currentUserEmail -> {
            Optional<LandlordUser> landlordUser = landlordUserRepository.findByCreatedBy(currentUserEmail);
            landlordUser.ifPresent(landlord -> {
                String cleanEmail = emailValidationBuilder.cleanAddress(tenant.getEmail());
                tenant.setEmail(cleanEmail);
                String accountId = landlord.getPaymentAccountId();
                String customerId = paymentService.createCustomer(cleanEmail, accountId);
                propertyRepository.findById(tenant.getPropertyId()).ifPresent(property -> {
                    String priceId = property.getMetadata().getPriceId();
                    String subscriptionId = paymentService.createSubscription(customerId, priceId, accountId);
                    TenantMetadata status = TenantMetadata.builder().customerId(customerId)
                            .subscriptionId(subscriptionId).build();
                    tenant.setMetadata(status);
                });
            });
        });
    }

    @HandleAfterCreate
    public void handleAfterCreate(Tenant tenant) throws IOException {
        emailService.sendInvite(tenant);
    }

    @HandleBeforeDelete
    public void handleBeforeDelete(Tenant tenant) {
        paymentService.deleteCustomer(tenant.getMetadata().getCustomerId());
    }

}
