package io.meraklis.happy_tenant.security;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Base64;
import javax.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @GetMapping("/principal")
    public Object principal(HttpServletRequest request) throws IOException {
        String jwtToken = request.getHeader("Authorization");

        String[] split_string = jwtToken.split("\\.");
        String base64EncodedBody = split_string[1];
        byte[] decode = Base64.getDecoder().decode(base64EncodedBody);

        ObjectMapper mapper = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        DecodedAuth0BearerToken decodedAuth0BearerToken = mapper.readValue(decode, DecodedAuth0BearerToken.class);
        return decodedAuth0BearerToken.sub;
    }

    @Data
    static class DecodedAuth0BearerToken {
        private String sub;
    }

}
