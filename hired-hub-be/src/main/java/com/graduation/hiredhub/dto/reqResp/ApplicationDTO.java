package com.graduation.hiredhub.dto.reqResp;

import com.graduation.hiredhub.dto.response.CVResponse;
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
public class ApplicationDTO {
    Integer id;
    ApplicationStatus status;
    String message;
    CVResponse cv;
    Instant createdAt;
    Instant updatedAt;
}
