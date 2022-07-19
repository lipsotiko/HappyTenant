package io.meraklis.happy_tenant.user.landlord;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
@PreAuthorize("hasPermission(#pageable, 'ADMIN')")
public interface LandlordUserRepository extends MongoRepository<LandlordUser, String> {

    @Override
    @PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasPermission(#landlordUser, 'WRITE_BY_ID')")
    LandlordUser save(LandlordUser landlordUser);

    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    Optional<LandlordUser> findByCreatedBy(String email);
}
