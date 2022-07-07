package io.meraklis.happy_tenant.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Base64;
import lombok.Data;

public class Auth0TokenParser {

    private final String bearerToken;

    public Auth0TokenParser(String bearerToken) {
        this.bearerToken = bearerToken;
    }

    public DecodedAuth0BearerToken decode() {
        String[] split_string = bearerToken.split("\\.");
        String base64EncodedBody = split_string[1];
        byte[] decode = Base64.getDecoder().decode(base64EncodedBody);

        ObjectMapper mapper = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        try {
            return mapper.readValue(decode, DecodedAuth0BearerToken.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Data
    static class DecodedAuth0BearerToken {

        @JsonProperty("sub")
        private String auth0UserId;
        @JsonProperty("https://meraklis.io/email")
        private String email;
    }

}
