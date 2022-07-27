package io.meraklis.happy_tenant.user.landlord;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sign-up/landlord")
public class LandlordSignUpController {

    @Autowired
    private LandlordUserService landlordUserService;

    @PostMapping
    public LandlordUser createUser(@RequestBody Map<String, String> request) {
        return landlordUserService.createUser(request);
    }

}
