package io.meraklis.happy_tenant.property;

import io.meraklis.happy_tenant.security.AbstractAuditor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Property extends AbstractAuditor {

    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String country;
    private Double rent;
    private Double deposit;
    private PaymentProductMetadata metadata;
}
