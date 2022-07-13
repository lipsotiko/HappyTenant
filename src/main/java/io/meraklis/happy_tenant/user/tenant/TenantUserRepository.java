package io.meraklis.happy_tenant.user.tenant;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
public interface TenantUserRepository extends MongoRepository<TenantUser, String> {

    @Override
    @PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasPermission(#tenantUser, 'WRITE_BY_ID')")
    TenantUser save(TenantUser tenantUser);

    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    Optional<TenantUser> findByCreatedBy(String email);
}
