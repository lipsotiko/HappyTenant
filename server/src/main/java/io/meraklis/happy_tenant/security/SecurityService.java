package io.meraklis.happy_tenant.security;

import java.util.Map;

public interface SecurityService {

    void createUser(Map<String, String> request);

    void deleteUser(String email);
}
