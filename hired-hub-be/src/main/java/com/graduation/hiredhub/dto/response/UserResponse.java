package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.entity.enumeration.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    String phoneNumber;
    Gender gender;
}
