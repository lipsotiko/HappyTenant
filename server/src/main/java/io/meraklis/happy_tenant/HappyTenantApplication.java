package io.meraklis.happy_tenant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class HappyTenantApplication {

    public static void main(String[] args) {
        SpringApplication.run(HappyTenantApplication.class, args);
    }

}
