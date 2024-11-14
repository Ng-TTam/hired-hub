package com.graduation.hiredhub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerAccountCreationRequest{

    AuthenticationRequest account;
    UserRequest user;

    @Size(max = 70, message = "INVALID_COMPANY_NAME")
            @NotBlank(message = "BLANK_COMPANY_NAME")
    String companyName;

    @Size(max = 20, message = "INVALID_POSITION_EMPLOYER")
             @NotBlank(message = "BLANK_POSITION_EMPLOYER")
    String position;

}
