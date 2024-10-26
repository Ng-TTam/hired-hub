package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.entity.Posting;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PostingMapper {

    Posting toPosting(PostingRequest postingRequest);

    PostingResponse toPostingResponse(Posting posting);

    void updatePosting(@MappingTarget Posting posting, PostingRequest postingRequest);
}
