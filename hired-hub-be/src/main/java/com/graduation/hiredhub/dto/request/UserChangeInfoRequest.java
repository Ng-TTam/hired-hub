package com.graduation.hiredhub.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class UserChangeInfoRequest {
    private String nameAccount;
    private String email;
    private String number;
    private LocalDate birth;
}