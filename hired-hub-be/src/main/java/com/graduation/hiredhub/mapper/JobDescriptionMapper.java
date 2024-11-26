package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.JobDescriptionDTO;
import com.graduation.hiredhub.entity.JobDescription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface JobDescriptionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workAddress", ignore = true)
    JobDescription toJobDescription(JobDescriptionDTO jobDescriptionDTO);

    @Mapping(target = "workAddress", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateJobDescription(@MappingTarget JobDescription jobDescription, JobDescriptionDTO jobDescriptionDTO);
}
