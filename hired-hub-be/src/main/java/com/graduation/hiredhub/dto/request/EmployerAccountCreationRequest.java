package com.graduation.hiredhub.dto.request;

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

    @Size(max = 20, message = "INVALID_POSITION_EMPLOYER")
    String position;

}
