package com.graduation.hiredhub.dto.request;

import org.hibernate.engine.jdbc.Size;

import com.graduation.hiredhub.entity.JobSeeker;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CVRequest {
    @NotBlank(message = "BLANK NAME")
    String name;

    @NotBlank(message = "BLANK DESCRIPTION")
    String description;

    @NotBlank(message = "BLANK EXPERIENCE")
    String experience;

    @NotBlank(message = "BLANK EDUCATION")
    String education;

    @NotBlank(message = "BLANK SKILL")
    String skill;

    String others;

    JobSeeker jobSeeker;
}
