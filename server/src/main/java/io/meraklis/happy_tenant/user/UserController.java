package io.meraklis.happy_tenant.user;

import io.meraklis.happy_tenant.security.SecurityService;
import io.meraklis.happy_tenant.security.user_email.Auth0UserEmail;
import io.meraklis.happy_tenant.security.user_email.Auth0UserEmailRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserService userService;

    @PostMapping
    public void createUser(@RequestBody Map<String, String> request) {
        securityService.createUser(request);
        User user = new User();
        user.setEmail(request.get("email"));
        user.setOrganization(request.get("organization"));
        user.setFullName(request.get("fullName"));
        userService.createUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public Optional<User> getUser(@PathVariable("userId") String userId) {
        return userService.getUser(userId);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String userId) {
        Optional<User> byUserId = userService.findByUserId(userId);
        byUserId.ifPresent(user -> {
            securityService.deleteUser(user.getEmail());
            userService.deleteUser(user.get_id());
        });

    }

}
