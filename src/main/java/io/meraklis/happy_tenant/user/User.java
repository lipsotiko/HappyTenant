package io.meraklis.happy_tenant.user;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String _id;
    private String email;
    private String fullName;
    private String organization;
}
