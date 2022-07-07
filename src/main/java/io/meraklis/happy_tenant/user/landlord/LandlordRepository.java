package io.meraklis.happy_tenant.user.landlord;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
@PreAuthorize("hasPermission(#pageable, 'ADMIN')")
public interface LandlordRepository extends MongoRepository<Landlord, String> {

    @Override
    @PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasPermission(#landlord, 'WRITE_BY_ID')")
    Landlord save(Landlord landlord);

    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    Optional<Landlord> findByCreatedBy(String email);
}
