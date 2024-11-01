package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.entity.enumeration.Gender;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    String phoneNumber;
    Gender gender;
    String avatar;
}
