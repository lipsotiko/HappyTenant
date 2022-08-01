package io.meraklis.happy_tenant.user.landlord;

import io.meraklis.happy_tenant.payment.PaymentAccountStatus;
import io.meraklis.happy_tenant.payment.PaymentService;
import io.meraklis.happy_tenant.security.CurrentUserAuditor;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/landlord-user/profile")
public class LandlordUserController {

    @Autowired
    private CurrentUserAuditor createUser;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private LandlordUserRepository landlordUserRepository;

    @GetMapping
    public Optional<LandlordUser> getLandlordProfile(@Param("returnPath") String returnPath) {
        Optional<LandlordUser> landlordUser = createUser.getCurrentAuditor().map(
                currentUserEmail -> landlordUserRepository.findByCreatedBy(currentUserEmail)
                        .orElseGet(() -> {
                            String accountId = paymentService.createAccount(currentUserEmail);
                            String customerId = paymentService.createCustomer(currentUserEmail, null);
                            return landlordUserRepository.save(
                                    LandlordUser.builder().paymentAccountId(accountId).paymentCustomerId(customerId)
                                            .build());
                        }));
        return landlordUser.map(landlord -> {
            PaymentAccountStatus status = paymentService.getAccountStatus(landlord.getPaymentAccountId(), returnPath);
            landlord.setPaymentAccountStatus(status);
            return landlord;
        });
    }

}
