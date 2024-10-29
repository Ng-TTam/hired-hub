package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.entity.JobSeeker;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CVResponse {
    String description;

    String experience;

    String education;

    String skill;

    String others;
}
