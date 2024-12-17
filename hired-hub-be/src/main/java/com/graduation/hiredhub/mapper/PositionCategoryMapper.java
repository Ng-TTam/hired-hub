package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.PositionCategoryCreateRequest;
import com.graduation.hiredhub.dto.response.PositionCategoryResponse;
import com.graduation.hiredhub.entity.PositionCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PositionCategoryMapper {
    PositionCategoryResponse toPositionCategoryResponse(PositionCategory positionCategory);
    PositionCategory toPositionCategory(PositionCategoryCreateRequest positionCategoryCreateRequest);
}
