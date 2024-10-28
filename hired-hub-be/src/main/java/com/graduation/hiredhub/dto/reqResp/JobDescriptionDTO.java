package com.graduation.hiredhub.dto.reqResp;

import com.graduation.hiredhub.entity.WorkAddress;
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
public class JobDescriptionDTO {
    Long id;
    String description;
    String requirement;
    String benefit;
    List<WorkAddressDTO> workAddress;
}
