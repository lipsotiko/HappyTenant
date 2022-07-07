package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.security.SecurityService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sign-up/owner")
public class LandlordSignUpController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private LandlordRepository landlordRepository;

    @PostMapping
    public void createUser(@RequestBody Map<String, String> request) {
        securityService.createUser(request);
        Landlord landlord = new Landlord();
        landlord.setOrganization(request.get("organization"));
        landlord.setFullName(request.get("fullName"));
        landlord.setCreatedBy(request.get("email"));
        landlordRepository.save(landlord);
    }

}
