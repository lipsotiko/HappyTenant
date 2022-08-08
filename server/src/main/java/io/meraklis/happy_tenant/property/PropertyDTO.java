package io.meraklis.happy_tenant.property;


import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    @JsonUnwrapped
    private Property property;
    private Long rent;
}
