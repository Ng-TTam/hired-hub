package com.graduation.hiredhub.dto.request;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @NotBlank(message = "BLANK_USERNAME")
    @Size(max = 100, message = "INVALID_NAME")
    String nameAccount;

    @NotBlank(message = "BLANK_USER")
    String username;

    @NotBlank(message = "BLANK_PASSWORD")
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    @Past(message = "DOB_FUTURE")
    LocalDate birth;

    @NotBlank(message = "BLANK_NUMBER")
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "INVALID_NUMBER")
    String number;

    @NotBlank(message = "BLANK_EMAIL")
    @Email(message = "INVALID_EMAIL")
    String email;

    String address;

    @NotBlank(message = "BLANK_GENDER")
    @Pattern(regexp = "^(male|female|other)$", message = "INVALID_GENDER")
    String gender;
}
