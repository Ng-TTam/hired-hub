package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.response.ScaleCategoryResponse;
import com.graduation.hiredhub.entity.ScaleCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScaleCategoryMapper {
    ScaleCategoryResponse scaleCategoryResponse(ScaleCategory scaleCategory);
}
