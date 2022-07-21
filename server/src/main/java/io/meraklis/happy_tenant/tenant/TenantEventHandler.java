package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.email.EmailService;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.property.PropertyRepository;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.user.landlord.LandlordUser;
import io.meraklis.happy_tenant.user.landlord.LandlordUserRepository;
import io.meraklis.happy_tenant.util.EmailValidationService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
                    String rentPriceId = property.getMetadata().getPriceId();

                    TenantMetadata status = TenantMetadata.builder().customerId(customerId).build();
                    if (tenant.getCreateMonthlySubscription()) {
                        String subscriptionId = paymentService.createSubscription(customerId, rentPriceId, accountId);
                        status.setSubscriptionId(subscriptionId);
                    }
                    tenant.setMetadata(status);

                    List<String> initialInvoice = new ArrayList<>();
                    if (tenant.getAddLastMonthsRentToInvoice()) {
                        String lastMonthsRentPriceId = createPriceForProduct(
                                "Last months rent",
                                property.getRent(),
                                accountId);
                        initialInvoice.add(lastMonthsRentPriceId);
                    }

                    if (tenant.getAddSecurityDepositToInvoice()) {
                        String securityDepositPriceId = createPriceForProduct(
                                "Security deposit",
                                tenant.getSecurityDeposit(),
                                accountId);
                        initialInvoice.add(securityDepositPriceId);
                    }

                    if (initialInvoice.size() > 0) {
                        String invoiceDescription = property.getAddress() + " - Deposit";
                        initialInvoice.forEach(
                                priceId -> paymentService.createInvoiceItem(priceId, customerId, accountId));
                        paymentService.createInvoice(
                                invoiceDescription,
                                tenant.getMoveInDate(),
                                customerId,
                                accountId);
                    }
                });
            });
        });
    }

    private String createPriceForProduct(String name, Double price, String accountId) {
        String securityDepositProductId = paymentService.createProduct(name, accountId);
        return paymentService.createPrice(price, securityDepositProductId, accountId, false);
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
