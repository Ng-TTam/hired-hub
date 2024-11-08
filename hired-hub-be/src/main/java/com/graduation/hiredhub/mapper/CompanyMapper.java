package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.CompanyCreationRequest;
import com.graduation.hiredhub.dto.response.CompanyResponse;
import com.graduation.hiredhub.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyResponse toCompanyResponse(Company company);

    @Mapping(target = "logo", ignore = true)
    @Mapping(target = "coverImage", ignore = true)
    Company toCompany(CompanyCreationRequest companyCreationRequest);
}
