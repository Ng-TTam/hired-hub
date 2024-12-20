package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.JobCategoryCreateRequest;
import com.graduation.hiredhub.dto.response.JobCategoryResponse;
import com.graduation.hiredhub.entity.JobCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobCategoryMapper {
    JobCategoryResponse toJobCategoryResponse(JobCategory jobCategory);
    JobCategory toJobCategory(JobCategoryCreateRequest jobCategoryCreateRequest);
}
