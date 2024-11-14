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
    Integer cV_Pending;
    Integer cV_Deactive;
    Integer cV_Active;
    Integer posting_Count;
}
