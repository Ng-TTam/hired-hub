package com.graduation.hiredhub.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationStatisticsResponse {
    Integer cVPending;
    Integer cVDeactive;
    Integer cVActive;
    Integer postingCount;
}
