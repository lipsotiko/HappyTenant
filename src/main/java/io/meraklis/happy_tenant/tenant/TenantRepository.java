package io.meraklis.happy_tenant.tenant;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
public interface TenantRepository extends MongoRepository<Tenant, String> {

    @Override
    @PreAuthorize("hasPermission(#tenant, 'WRITE_BY_ID')")
    Tenant save(Tenant tenant);

    @Override
    @PreAuthorize("hasPermission(#id, 'tenant', 'DELETE_BY_ID')")
    void deleteById(String id);

    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    List<Tenant> findByCreatedBy(String email);

    List<Tenant> findByEmail(String email);
}
