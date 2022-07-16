package io.meraklis.happy_tenant.user.tenant;

import io.meraklis.happy_tenant.security.SecurityService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sign-up/tenant")
public class TenantSignUpController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private TenantUserRepository tenantUserRepository;

    @PostMapping
    public void createUser(@RequestBody Map<String, String> request) {
        securityService.createUser(request);
        TenantUser tenantUser = new TenantUser();
        tenantUser.setFullName(request.get("fullName"));
        tenantUser.setCreatedBy(request.get("email"));
        tenantUserRepository.save(tenantUser);
    }

}
