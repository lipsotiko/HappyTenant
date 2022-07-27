package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.payment.PaymentAccountStatus;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import io.meraklis.happy_tenant.security.SecurityService;
import io.meraklis.happy_tenant.util.EmailValidationService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LandlordUserService {

    @Autowired
    private LandlordUserRepository landlordUserRepository;
    @Autowired
    private EmailValidationService emailValidationService;
    @Autowired
    private CurrentUserAuditor currentUserAuditor;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private SecurityService securityService;

    public LandlordUser createUser(Map<String, String> request) {
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

    public void createPaymentAccounts(LandlordUser landlordUser) {
        currentUserAuditor.getCurrentAuditor().ifPresent(email -> {
            landlordUser.setPaymentAccountId(paymentService.createAccount(email));
            landlordUser.setPaymentCustomerId(paymentService.createCustomer(email));
        });
    }

    public void setAccountStatus(LandlordUser landlordUser) {
        landlordUser.setPaymentAccountStatus(
                paymentService.getAccountStatus(landlordUser.getPaymentAccountId(), "/profile"));
    }

    public void deleteAccount(LandlordUser landlordUser) {
        securityService.deleteUser(landlordUser.getCreatedBy());
    }
}
