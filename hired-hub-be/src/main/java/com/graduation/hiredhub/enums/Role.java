package com.graduation.hiredhub.enums;
import lombok.Getter;

@Getter
public enum Role {
    JOB_SEEKER("JOB_SEEKER"),
    EMPLOYER("EMPLOYER"),
    ADMIN("ADMIN")
    ;

    Role(String name){
        this.name = name;
    };

    private final String name;
}
