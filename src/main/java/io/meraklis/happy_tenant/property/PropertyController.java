package io.meraklis.happy_tenant.property;

import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.tenant.Tenant;
import io.meraklis.happy_tenant.tenant.TenantRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private CurrentUserAuditor currentUserAuditor;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{id}")
    public PropertyDTO get(@PathVariable("id") String id) {
        return propertyRepository.findById(id).map(property -> {
            PaymentProductMetadata metadata = property.getMetadata();
            Long price = paymentService.getPrice(metadata.getPriceId(), metadata.getAccountId());
            return PropertyDTO.builder().property(property).rent(price).build();
        }).orElseThrow();
    }

    @GetMapping("/tenant/all")
    TenantPropertyDTO getTenantProperties() {
        Optional<String> currentUserAuditorCurrentAuditor = currentUserAuditor.getCurrentAuditor();
        return currentUserAuditorCurrentAuditor.map(currentUserEmail -> {
            List<Tenant> tenants = tenantRepository.findByEmail(currentUserEmail);
            List<String> propertyIds = tenants.stream().map(Tenant::getPropertyId).collect(Collectors.toList());
            Iterable<Property> properties = propertyRepository.findAllById(propertyIds);
            return new TenantPropertyDTO(tenants.get(0), properties);
        }).orElseThrow();
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class TenantPropertyDTO {
        private Tenant tenant;
        private Iterable<Property> properties;
    }
}
