package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.ProvinceDTO;
import com.graduation.hiredhub.dto.reqResp.ProvinceDetailDTO;
import com.graduation.hiredhub.entity.Province;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProvinceMapper {
    ProvinceDetailDTO toProvinceDetailDTO(Province province);
    ProvinceDTO toProvinceDTO(Province province);
}
