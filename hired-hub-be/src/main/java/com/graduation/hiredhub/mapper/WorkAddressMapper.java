package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.WorkAddressDTO;
import com.graduation.hiredhub.entity.WorkAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkAddressMapper {
    @Mapping(target = "id", ignore = true)
    WorkAddress toWorkAddress(WorkAddressDTO workAddressDTO);
}
