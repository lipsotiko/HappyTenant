package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.payment.PaymentAccountStatus;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.SecurityService;
import io.meraklis.happy_tenant.util.EmailValidationService;
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
    private SecurityService securityService;

    @Autowired
    private LandlordUserRepository landlordUserRepository;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailValidationService emailValidationService;

    @PostMapping
    public LandlordUser createUser(@RequestBody Map<String, String> request) {
        securityService.createUser(request);
        LandlordUser newLandlordUser = new LandlordUser();
        newLandlordUser.setOrganization(request.get("organization"));
        newLandlordUser.setFullName(request.get("fullName"));

        String email = emailValidationService.cleanAddress(request.get("email"));
        newLandlordUser.setCreatedBy(email);

        String paymentAccountId = paymentService.createAccount(email);
        newLandlordUser.setPaymentAccountId(paymentAccountId);
        newLandlordUser.setPaymentCustomerId(paymentService.createCustomer(email));

        String returnPath = request.get("returnPath");
        LandlordUser saved = landlordUserRepository.save(newLandlordUser);
        PaymentAccountStatus accountStatus = paymentService.getAccountStatus(paymentAccountId, returnPath);
        saved.setPaymentAccountStatus(accountStatus);
        return saved;
    }

}
