package io.meraklis.happy_tenant.user;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> findByUserId(String userId) {
        return userRepository.findById(userId);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(String userId) {
        return userRepository.findById(userId);
    }
}
