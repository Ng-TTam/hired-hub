package com.graduation.hiredhub.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminCompanyFilterCriteria {
    String name;
    Boolean isActive;
}
