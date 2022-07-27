package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.email.EmailService;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.property.PropertyRepository;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.user.landlord.LandlordUser;
import io.meraklis.happy_tenant.user.landlord.LandlordUserRepository;
import io.meraklis.happy_tenant.util.EmailValidationService;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Period;
import java.util.Optional;
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
                tenant.setPaymentCustomerId(customerId);

                propertyRepository.findById(tenant.getPropertyId()).ifPresent(property -> {
                    String rentPriceId = property.getMetadata().getPriceId();

                    if (tenant.getCreateMonthlySubscription()) {
                        paymentService.createSubscription(
                                customerId,
                                rentPriceId,
                                tenant.getBillingStartDate(),
                                accountId);
                    }

                    boolean generateInitialInvoice = false;
                    if (tenant.getAddProratedFirstMonthsRent()) {
                        generateInitialInvoice = true;
                        int proratedDays = Period.between(tenant.getMoveInDate(), tenant.getBillingStartDate()).getDays();
                        var bigDecimal = new BigDecimal(((property.getRent() * 12) / 365) * proratedDays);
                        double proratedFirstMonthsRent = bigDecimal.setScale(2, RoundingMode.HALF_UP).doubleValue();
                        paymentService.createInvoiceItem(
                                "First months prorated rent", proratedFirstMonthsRent, customerId, accountId);
                    }

                    if (tenant.getAddLastMonthsRentToInvoice()) {
                        generateInitialInvoice = true;
                        paymentService.createInvoiceItem(
                                "Last months rent", property.getRent(), customerId, accountId);
                    }

                    if (tenant.getAddSecurityDepositToInvoice()) {
                        generateInitialInvoice = true;
                        paymentService.createInvoiceItem(
                                "Security deposit", tenant.getSecurityDeposit(), customerId, accountId);
                    }

                    if (generateInitialInvoice) {
                        String invoiceDescription = property.getAddress() + " - Deposit";
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

    @HandleAfterCreate
    public void handleAfterCreate(Tenant tenant) throws IOException {
        emailService.sendInvite(tenant);
    }

}
