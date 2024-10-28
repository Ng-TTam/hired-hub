package com.graduation.hiredhub.dto.reqResp;

import com.graduation.hiredhub.entity.District;
import com.graduation.hiredhub.entity.JobDescription;
import com.graduation.hiredhub.entity.Province;
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
    Province province;
    District district;
    JobDescription jobDescription;
}
