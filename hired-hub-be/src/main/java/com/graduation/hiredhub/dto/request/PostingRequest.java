package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.JobCategory;
import com.graduation.hiredhub.entity.JobDescription;
import com.graduation.hiredhub.entity.PositionCategory;
import com.graduation.hiredhub.entity.enumeration.CurrencyUnit;
import com.graduation.hiredhub.entity.enumeration.ExperienceRequire;
import com.graduation.hiredhub.entity.enumeration.Gender;
import com.graduation.hiredhub.entity.enumeration.JobType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingRequest {
    @NotBlank(message = "BLANK_TITLE_POSTING")
    @Size(max = 100, message = "INVALID_TITLE_POSTING")
    String title;

    @NotNull(message = "BLANK_EXPERIENCE_REQUIRE")
    ExperienceRequire experienceRequire;

    Gender genderRequire;

    @NotNull(message = "BLANK_NUM_OF_POSITION")
    @Min(value = 1, message = "INVALID_NUM_OF_POSITION")
    Integer numberOfPosition;

    @NotNull(message = "BLANK_JOB_TYPE")
    JobType jobType;

    @NotNull(message = "BLANK_JOB_DESCRIPTION")
    JobDescription jobDescription;

    @NotNull(message = "BLANK_MAIN_JOB")
    JobCategory mainJob;

    List<JobCategory> subJobs;

    @NotNull(message = "BLANK_POSITION")
    PositionCategory position;

    @NotNull(message = "BLANK_CURRENCY_UNIT")
    CurrencyUnit currencyUnit;

    Integer minimumSalary;
    Integer maximumSalary;
}

