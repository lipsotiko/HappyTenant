package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.property.Property;
import io.meraklis.happy_tenant.property.PropertyRepository;
import io.meraklis.happy_tenant.security.AbstractAuditor;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tenants")
@PreAuthorize("hasPermission(#entity, 'ADMIN')")
public class TenantController {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/all")
    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    public List<Tenant> findByCreatedBy(@Param("email") String email) {
        List<Tenant> tenants = tenantRepository.findByCreatedBy(email);
        List<String> propertyIds = tenants.stream().map(Tenant::getPropertyId).collect(Collectors.toList());
        Map<String, Property> propertyMap = StreamSupport.stream(
                        propertyRepository.findAllById(propertyIds).spliterator(),
                        false)
                .collect(Collectors.toMap(AbstractAuditor::get_id, p -> p));
        return tenants.stream().peek(t -> t.setProperty(propertyMap.get(t.getPropertyId())))
                .collect(Collectors.toList());
    }
}
