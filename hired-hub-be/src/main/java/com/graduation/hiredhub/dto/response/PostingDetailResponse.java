package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.dto.reqResp.JobCategoryDTO;
import com.graduation.hiredhub.dto.reqResp.JobDescriptionDTO;
import com.graduation.hiredhub.dto.reqResp.PositionCategoryDTO;
import com.graduation.hiredhub.entity.enumeration.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingDetailResponse {
    String id;
    String title;
    ExperienceRequire experienceRequire;
    Gender genderRequire;
    Integer numberOfPosition;
    JobType jobType;
    Instant createdAt;
    Instant updatedAt;
    Instant expiredAt;
    JobDescriptionDTO jobDescription;
    JobCategoryDTO mainJob;
    List<JobCategoryDTO> subJobs;
    PositionCategoryDTO position;
    CurrencyUnit currencyUnit;
    Integer minimumSalary;
    Integer maximumSalary;
    CompanyResponse company;
    PostingStatus status;
}
