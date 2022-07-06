package io.meraklis.happy_tenant.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.meraklis.happy_tenant.security.user_email.Auth0UserEmail;
import io.meraklis.happy_tenant.security.user_email.Auth0UserEmailRepository;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Auth0SecurityService implements SecurityService {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String domain;
    @Value("${auth0.client_id}")
    private String clientId;
    @Value("${auth0.client_secret}")
    private String clientSecret;
    @Value("${auth0.connection}")
    private String connection;

    private final RestTemplate restTemplate = new RestTemplate();
    @Autowired
    private Auth0UserEmailRepository auth0UserEmailRepository;
    @Autowired
    private TokenRefreshService tokenRefreshService;

    @Override
    public void createUser(Map<String, String> user) {
        String api = domain + "api/v2/users";

        Map<String, Object> request = new HashMap<>();
        request.put("email", user.get("email"));
        request.put("password", user.get("password"));
        request.put("verify_email", false);
        request.put("connection", connection);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(request, headers());
        ResponseEntity<Auth0User> exchange = restTemplate.exchange(api, HttpMethod.POST, requestEntity,
                Auth0User.class);
        Auth0User body = exchange.getBody();

        Auth0UserEmail auth0UserEmail = new Auth0UserEmail(body.getUser_id(), body.getEmail());
        auth0UserEmailRepository.save(auth0UserEmail);
    }

    @Override
    public void deleteUser(String email) {
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers());
        List<String> userIdsByEmail = findUserIdsByEmail(email);
        userIdsByEmail.forEach(userId -> {
            String api = domain + "api/v2/users/{userId}";
            Map<String, String> params = new HashMap<>();
            params.put("userId", userId);
            restTemplate.exchange(api, HttpMethod.DELETE, requestEntity, Void.class, params);
            auth0UserEmailRepository.deleteByUserId(userId);
        });
    }

    public List<String> findUserIdsByEmail(String email) {
        String api = domain + "api/v2/users-by-email?email={email}&fields={fields}";

        Map<String, String> params = new HashMap<>();
        params.put("email", email);
        params.put("fields", "email,user_id");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers());
        ResponseEntity<Auth0User[]> exchange = restTemplate.exchange(api, HttpMethod.GET, requestEntity,
                Auth0User[].class, params);
        return Arrays.stream(exchange.getBody()).map(Auth0User::getUser_id)
                .collect(Collectors.toList());
    }

    private Auth0Token accessToken() {
        String api = domain + "oauth/token";
        String audience = domain + "api/v2/";

        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("audience", audience);
        body.put("grant_type", "client_credentials");

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, new HttpHeaders());

        ResponseEntity<Auth0Token> exchange = restTemplate.exchange(api, HttpMethod.POST, requestEntity,
                Auth0Token.class);
        return exchange.getBody();
    }

    private HttpHeaders headers() {
        HttpHeaders httpHeaders = new HttpHeaders();

        if (!tokenRefreshService.isValid()) {
            Auth0Token auth0Token = accessToken();
            tokenRefreshService.setToken(auth0Token.getAccess_token());
            tokenRefreshService.setExpires(auth0Token.getExpires_in());
        }

        httpHeaders.setBearerAuth(tokenRefreshService.getToken());
        return httpHeaders;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Auth0User {

        private String email;
        private String user_id;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Auth0Token {

        private String access_token;
        private Integer expires_in;
    }

}
