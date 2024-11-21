package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.dto.reqResp.JobCategoryDTO;
import com.graduation.hiredhub.dto.reqResp.PositionCategoryDTO;
import com.graduation.hiredhub.entity.enumeration.CurrencyUnit;
import com.graduation.hiredhub.entity.enumeration.JobType;
import com.graduation.hiredhub.entity.enumeration.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingResponse {
    String id;
    String title;
    JobType jobType;
    Instant createdAt;
    Instant updatedAt;
    Instant expiredAt;
    JobCategoryDTO mainJob;
    List<JobCategoryDTO> subJobs;
    PositionCategoryDTO position;
    CurrencyUnit currencyUnit;
    Integer minimumSalary;
    Integer maximumSalary;
    Status status;
}
