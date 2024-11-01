package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
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
public class ApplicationRequest {
    ApplicationStatus status;
    String message;
    CV cv;
    Posting posting;
}
