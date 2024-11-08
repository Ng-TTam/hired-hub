package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.CompanyCreationRequest;
import com.graduation.hiredhub.dto.response.CompanyResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.Company;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.CompanyMapper;
import com.graduation.hiredhub.repository.CompanyRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyService {
    CompanyRepository companyRepository;
    CompanyMapper companyMapper;
    MinioService minioService;

    static final String FOLDER_UPLOAD_LOGO = "logos-company";
    static final String FOLDER_UPLOAD_COVER = "covers-company";

    @Transactional
    @PreAuthorize("hasRole('EMPLOYER')")
    public CompanyResponse createCompany(CompanyCreationRequest companyCreationRequest) {
           Company company = companyMapper.toCompany(companyCreationRequest);
           if(companyCreationRequest.getLogo() != null){
               company.setLogo(minioService.uploadFile(companyCreationRequest.getLogo(), FOLDER_UPLOAD_LOGO));
           }
           if (companyCreationRequest.getCoverImage() != null){
               company.setCoverImage(minioService.uploadFile(companyCreationRequest.getCoverImage(), FOLDER_UPLOAD_COVER));
           }

        try {
            companyRepository.save(company);
        }  catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        return companyMapper.toCompanyResponse(company);
    }

    public PageResponse<CompanyResponse> getAllCompany(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1,size);
        var pageData = companyRepository.findAll(pageable);
        return PageResponse.<CompanyResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(companyMapper::toCompanyResponse).toList())
                .build();
    }


}
