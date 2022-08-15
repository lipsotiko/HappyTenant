package io.meraklis.happy_tenant.tenant;

import io.meraklis.happy_tenant.property.PropertyRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public Optional<Tenant> findByEmail(String email) {
        List<Tenant> tenants = tenantRepository.findByEmail(email);
        if (tenants.size() == 0) {
            return Optional.empty();
        }
        Tenant tenant = tenants.get(0);
        propertyRepository.findById(tenant.getPropertyId()).ifPresent(tenant::setProperty);
        return Optional.of(tenant);
    }
}
