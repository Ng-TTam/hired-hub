package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.Gender;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {
    @NotBlank(message = "BLANK_FIRST_NAME")
    @Size(max = 20, message = "INVALID_NAME")
    String firstName;

    @NotBlank(message = "BLANK_LAST_NAME")
    @Size(max = 20, message = "INVALID_NAME")
    String lastName;

    @Past(message = "DOB_FUTURE")
    LocalDate dob;

    @NotBlank(message = "BLANK_ADDRESS")
    @Size(max = 50)
    String address;

    @NotBlank(message = "BLANK_PHONE_NUMBER")
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,13}$", message = "INVALID_PHONE_NUMBER")
    String phoneNumber;

    @NotNull(message = "BLANK_GENDER")
    Gender gender;
}
