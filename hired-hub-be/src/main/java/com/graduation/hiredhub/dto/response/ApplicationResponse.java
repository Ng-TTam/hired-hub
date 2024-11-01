package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
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
public class ApplicationResponse {
    String id;
    ApplicationStatus status;
    String message;
    CVResponse cvResponse;
    PostingResponse postingResponse;
    Instant createdAt;
    Instant updatedAt;
}
