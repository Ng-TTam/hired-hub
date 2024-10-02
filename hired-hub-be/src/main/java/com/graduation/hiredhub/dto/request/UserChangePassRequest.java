package com.graduation.hiredhub.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class UserChangePassRequest {
    private String currentPassword;
    private String newPassword;
}
