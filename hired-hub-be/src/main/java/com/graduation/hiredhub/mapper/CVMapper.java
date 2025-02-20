package com.graduation.hiredhub.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.graduation.hiredhub.dto.request.CVRequest;
import com.graduation.hiredhub.dto.response.CVResponse;
import com.graduation.hiredhub.entity.CV;

@Mapper(componentModel = "spring")
public interface CVMapper {
    CV toCV(CVRequest cvRequest);

    @Mapping(source = "jobSeeker", target = "jobSeeker")
    CVResponse toCVResponse(CV cv);
    
    void updateCV(@MappingTarget CV cv, CVRequest cvRequest);
}
