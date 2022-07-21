package io.meraklis.happy_tenant.property;

import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.user.landlord.LandlordUser;
import io.meraklis.happy_tenant.user.landlord.LandlordUserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@Configuration
@RepositoryEventHandler
public class PropertyEventHandler {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private LandlordUserRepository landlordUserRepository;

    @Autowired
    private CurrentUserAuditor currentUserAuditor;

    @HandleBeforeCreate
    public void handleBeforeCreate(Property property) {
        currentUserAuditor.getCurrentAuditor().ifPresent(currentUserEmail -> {
            Optional<LandlordUser> landlordUser = landlordUserRepository.findByCreatedBy(currentUserEmail);
            landlordUser.ifPresent(landlord -> {
                String accountId = landlord.getPaymentAccountId();
                String productId = paymentService.createProduct(property.getAddress(), accountId);
                String priceId = paymentService.createPrice(property.getRent(), productId, accountId, true);
                PaymentProductMetadata metadata =
                        PaymentProductMetadata.builder().accountId(accountId).productId(productId).priceId(priceId)
                                .build();
                property.setMetadata(metadata);
            });
        });
    }
}
