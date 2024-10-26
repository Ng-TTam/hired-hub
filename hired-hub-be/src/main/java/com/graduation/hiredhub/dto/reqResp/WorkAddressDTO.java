package com.graduation.hiredhub.dto.reqResp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkAddressDTO {
    String id;
    String location;
    ProvinceDTO province;
    DistrictDTO district;
}
