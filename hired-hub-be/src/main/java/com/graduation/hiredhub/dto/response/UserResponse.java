package com.graduation.hiredhub.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    int id;
    String nameAccount;
    String nameLogin;
    String email;
    String number;
    LocalDate birth;
    String address;
    String gender;
    int rewardPoint;

    Set<RoleResponse> roles;
}
