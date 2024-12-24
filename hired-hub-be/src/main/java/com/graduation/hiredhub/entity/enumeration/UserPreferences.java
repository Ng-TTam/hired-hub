package com.graduation.hiredhub.entity.enumeration;

import lombok.Getter;

@Getter
public enum UserPreferences {
    JOB("job"),
    POSITION("position"),
    COMPANYID("companyId");

    private final String key;

    UserPreferences(String key) {
        this.key = key;
    }
}
