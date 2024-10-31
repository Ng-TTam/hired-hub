package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.ExperienceRequire;
import com.graduation.hiredhub.entity.enumeration.JobType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingFilterCriteria {
    String searchValue;
    Integer provinceId;
    Integer districtId;
    Integer jobCategoryId;
    ExperienceRequire experienceRequire;
    Integer minSalary;
    Integer maxSalary;
    Integer positionId;
    JobType jobType;
}
