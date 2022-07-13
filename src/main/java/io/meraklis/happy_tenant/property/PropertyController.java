package io.meraklis.happy_tenant.property;

import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.tenant.Tenant;
import io.meraklis.happy_tenant.tenant.TenantRepository;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/tenant/all")
    Iterable<Property> getTenantProperties() {
        Optional<String> currentUserAuditorCurrentAuditor = currentUserAuditor.getCurrentAuditor();
        return currentUserAuditorCurrentAuditor.map(currentUserEmail -> {
            List<Tenant> tenants = tenantRepository.findByEmail(currentUserEmail);
            List<String> propertyIds = tenants.stream().map(Tenant::getPropertyId).collect(Collectors.toList());
            return propertyRepository.findAllById(propertyIds);
        }).orElse(Collections.emptyList());
    }
}
