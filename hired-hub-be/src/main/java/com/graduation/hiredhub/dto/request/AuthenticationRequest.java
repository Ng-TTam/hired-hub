package com.graduation.hiredhub.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationRequest {
    @Email
    @NotBlank(message = "BLANK_EMAIL")
    @Size(max = 50, message = "INVALID_NAME")
    String email;

    @NotBlank(message = "BLANK_PASSWORD")
    @Size(min = 8, max = 64, message = "INVALID_PASSWORD")
    String password;
}
