package com.graduation.hiredhub.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class UserRequest {
    private String nameAccount;
    private String username;
    private String email;
    private String number;
    private LocalDate birth;
    private int rewardPoint;
}
