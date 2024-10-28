package com.graduation.hiredhub.dto.reqResp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProvinceDTO {
    Integer id;
    String name;
    List<DistrictDTO> districts;
}
