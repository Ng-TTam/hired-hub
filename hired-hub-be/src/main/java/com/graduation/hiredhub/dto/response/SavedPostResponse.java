package com.graduation.hiredhub.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedPostResponse {
    Integer id;
    Instant savedAt;
    PostingDetailResponse posting;
}
