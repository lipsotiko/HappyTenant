package io.meraklis.happy_tenant.security;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component
public class CustomAuditor implements AuditorAware<String> {

    @Autowired
    private HttpServletRequest request;

    @Override
    public Optional<String> getCurrentAuditor() {
        String authorization = request.getHeader("Authorization");
        if (authorization == null) {
            return Optional.empty();
        }
        Auth0TokenParser auth0TokenParser = new Auth0TokenParser(authorization);
        return Optional.of(auth0TokenParser.decode().getEmail());
    }
}
