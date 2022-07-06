package io.meraklis.happy_tenant.security.user_email;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Auth0UserEmailRepository extends MongoRepository<Auth0UserEmail, String> {

    void deleteByUserId(String userId);
}
