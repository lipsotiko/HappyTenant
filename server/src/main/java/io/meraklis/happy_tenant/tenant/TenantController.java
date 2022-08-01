package io.meraklis.happy_tenant.tenant;

import com.stripe.model.Invoice;
import io.meraklis.happy_tenant.email.EmailService;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.property.Property;
import io.meraklis.happy_tenant.property.PropertyRepository;
import io.meraklis.happy_tenant.security.AbstractAuditor;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.user.landlord.LandlordUser;
import io.meraklis.happy_tenant.user.landlord.LandlordUserRepository;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private CurrentUserAuditor currentUserAuditor;

    @Autowired
    private EmailService emailService;

    @Autowired
    private LandlordUserRepository landlordUserRepository;

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/all")
    public List<Tenant> findByCreatedBy() {
        Optional<String> currentUserEmail = currentUserAuditor.getCurrentAuditor();
        return currentUserEmail.map(email -> {
            List<Tenant> tenants = tenantRepository.findByCreatedBy(email);
            List<String> propertyIds = tenants.stream().map(Tenant::getPropertyId).collect(Collectors.toList());
            Map<String, Property> propertyMap = StreamSupport.stream(
                            propertyRepository.findAllById(propertyIds).spliterator(),
                            false)
                    .collect(Collectors.toMap(AbstractAuditor::get_id, p -> p));
            return tenants.stream().peek(t -> t.setProperty(propertyMap.get(t.getPropertyId())))
                    .collect(Collectors.toList());
        }).orElse(Collections.emptyList());
    }

    @GetMapping("/{id}/invoices")
    public List<Invoice> getInvoices(@PathVariable("id") String tenantId) {
        return currentUserAuditor.getCurrentAuditor().flatMap(email -> tenantRepository.findById(tenantId)
                .flatMap(tenant -> landlordUserRepository.findByCreatedBy(email)
                        .map(landlordUser -> paymentService.getCustomerInvoices(tenant.getPaymentCustomerId(),
                                landlordUser.getPaymentAccountId())))).orElse(null);
    }

    @PostMapping("/resend-invitation/{tenantId}")
    public void resendInvitation(@PathVariable("tenantId") String tenantId) {
        Optional<String> currentUserEmail = currentUserAuditor.getCurrentAuditor();
        Optional<Tenant> tenantById = tenantRepository.findById(tenantId);
        tenantById.ifPresent(tenant -> currentUserEmail.ifPresent(email -> {
            if (tenant.getCreatedBy().equals(email)) {
                try {
                    emailService.sendInvite(tenant);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }));
    }
}
