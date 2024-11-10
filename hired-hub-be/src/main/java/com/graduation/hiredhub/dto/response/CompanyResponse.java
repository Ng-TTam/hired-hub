package com.graduation.hiredhub.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyResponse {
    String id;
    String name;
    String taxCode;
    Instant establishYear;
    String logo;
    String address;
    String website;
    String coverImage;
    String description;
    Instant createdAt;
    Instant updatedAt;
    Boolean isActive;
}
