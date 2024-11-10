package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.response.CompanyDetailResponse;
import com.graduation.hiredhub.dto.response.CompanyResponse;
import com.graduation.hiredhub.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyResponse toCompanyResponse(Company company);
    CompanyDetailResponse toCompanyDetailResponse(Company company, Integer followers);
}
