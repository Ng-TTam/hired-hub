package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.dto.reqResp.JobCategoryDTO;
import com.graduation.hiredhub.dto.reqResp.PositionCategoryDTO;
import com.graduation.hiredhub.entity.enumeration.CurrencyUnit;
import com.graduation.hiredhub.entity.enumeration.JobType;
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
public class PostingResponse {
    String id;
    String title;
    JobType jobType;
    JobCategoryDTO mainJob;
    List<JobCategoryDTO> subJobs;
    PositionCategoryDTO position;
    CurrencyUnit currencyUnit;
    Integer minimumSalary;
    Integer maximumSalary;
}
