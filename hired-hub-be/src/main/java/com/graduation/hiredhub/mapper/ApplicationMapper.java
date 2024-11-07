package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.entity.Application;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ApplicationMapper {
    ApplicationDTO toApplicationDTO(Application application);

    @Mapping(source = "cv", target = "cv")
    @Mapping(source = "posting", target = "posting")
    ApplicationResponse toApplicationResponse(Application application);

    @Mapping(target = "cv", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateApplication(@MappingTarget Application application, ApplicationDTO applicationDTO);
}
