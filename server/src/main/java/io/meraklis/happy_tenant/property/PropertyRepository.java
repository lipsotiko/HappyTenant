package io.meraklis.happy_tenant.property;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
public interface PropertyRepository extends MongoRepository<Property, String> {

    @Override
    @PreAuthorize("hasPermission(#property, 'WRITE_BY_ID')")
    Property save(Property property);

    @PreAuthorize("hasPermission(#email, 'READ_BY_EMAIL')")
    List<Property> findByCreatedBy(String email);
}
