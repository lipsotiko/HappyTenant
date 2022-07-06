package io.meraklis.happy_tenant.security;

import java.time.Instant;
import org.springframework.stereotype.Service;

@Service
public class TokenRefreshService {
    private String token;
    private Instant expires;

    public Boolean isValid() {
        return token != null && Instant.now().isBefore(expires);
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setExpires(Integer expiresIn) {
        expires = Instant.now().plusSeconds(expiresIn);
    }

    public String getToken() {
        return token;
    }
}
