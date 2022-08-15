package io.meraklis.happy_tenant.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class EmailValidationServiceTest {

    @Autowired
    private EmailValidationService subject;

    @Test
    void good_email() {
        Assertions.assertEquals("evangelos@meraklis.io", subject.cleanAddress("evangelos@meraklis.io"));
    }

    @Test
    void domain_typo() {
        Assertions.assertEquals("evangelos@gmail.com", subject.cleanAddress("evangelos@gmil.com"));
    }

    @Test
    void gmail_dots_removed() {
        Assertions.assertEquals("evangelosponeres@gmail.com", subject.cleanAddress("evangelos.poneres@gmail.com"));
    }

    @Test
    void gmail_stop_character_removed() {
        Assertions.assertEquals("evangelos@gmail.com", subject.cleanAddress("evangelos+cool@gmail.com"));
    }
    @Test
    void yahoo_stop_character_removed() {
        Assertions.assertEquals("evangelos@yahoo.com", subject.cleanAddress("evangelos-cool@yahoo.com"));
    }

    @Test
    void bad_domain() {
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                subject.cleanAddress("evangelos35gmai.com"));
    }
}
