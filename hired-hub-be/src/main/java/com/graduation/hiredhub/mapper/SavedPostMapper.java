package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.response.SavedPostResponse;
import com.graduation.hiredhub.entity.SavedPost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SavedPostMapper {
    @Mapping(source = "posting.employer.company", target = "posting.company")
    SavedPostResponse toSavedPostResponse(SavedPost savedPost);
}
