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
public class CompanyDetailResponse {
    String id;
    String name;
    String taxCode;
    Instant establishYear;
    String logo;
    String address;
    String coverImage;
    String description;
    Instant createdAt;
    Instant updatedAt;
    Boolean isActive;
    ScaleCategoryResponse scaleCategory;
    Integer followers;
}
