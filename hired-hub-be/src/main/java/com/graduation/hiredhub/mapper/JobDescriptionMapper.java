package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.JobDescriptionDTO;
import com.graduation.hiredhub.entity.JobDescription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JobDescriptionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workAddress", ignore = true)
    JobDescription toJobDescription(JobDescriptionDTO jobDescriptionDTO);
}
