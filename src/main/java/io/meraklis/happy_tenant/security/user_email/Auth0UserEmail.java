package io.meraklis.happy_tenant.security.user_email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Auth0UserEmail {

    private String userId;
    private String email;
}
