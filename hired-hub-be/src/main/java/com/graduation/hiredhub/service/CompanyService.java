package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.request.CompanyCreationRequest;
import com.graduation.hiredhub.dto.response.CompanyDetailResponse;
import com.graduation.hiredhub.dto.response.CompanyResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.Company;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.CompanyMapper;
import com.graduation.hiredhub.repository.CompanyRepository;
import com.graduation.hiredhub.repository.SubscriptionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyService {
    CompanyRepository companyRepository;
    SubscriptionRepository subscriptionRepository;
    CompanyMapper companyMapper;
    MinioService minioService;
    StringRedisTemplate stringRedisTemplate;
    ObjectMapper objectMapper;

    static final String FOLDER_UPLOAD_LOGO = "logos-company";
    static final String FOLDER_UPLOAD_COVER = "covers-company";
    static final String REDIS_COMPANIES_KEY = "postings";
    static final long CACHE_COMPANIES_TTL_MINUTES = 10;

    public CompanyDetailResponse findById(String companyId) {
        return companyRepository.findById(companyId)
                .map(company -> {
                    int followers = subscriptionRepository.countByCompanyId(companyId);
                    return companyMapper.toCompanyResponse(company, followers);
                })
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_EXISTED));
    }

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
            company.setIsActive(false);
            companyRepository.save(company);
        }  catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        return companyMapper.toCompanyResponse(company);
    }


    public PageResponse<CompanyResponse> getAllCompany(int page, int size) {
        String cacheKey = REDIS_COMPANIES_KEY + "_page_" + page + "_size_" + size;
        PageResponse<CompanyResponse> pageResponse;

        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(cacheKey))) {
            try {
                pageResponse = objectMapper.readValue(stringRedisTemplate.opsForValue().get(cacheKey),
                        new TypeReference<PageResponse<CompanyResponse>>() {});
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_PARSING_JSON);
            }
        } else {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Company> pageData = companyRepository.findAllByIsActiveTrue(pageable);

            pageResponse = PageResponse.<CompanyResponse>builder()
                    .currentPage(page)
                    .pageSize(pageData.getSize())
                    .totalPages(pageData.getTotalPages())
                    .totalElements(pageData.getTotalElements())
                    .data(pageData.getContent().stream().map(companyMapper::toCompanyResponse).toList())
                    .build();

            // converted from Object to JSON before save in Redis
            try {
                String jsonResponse = objectMapper.writeValueAsString(pageResponse);
                stringRedisTemplate.opsForValue().set(cacheKey, jsonResponse, CACHE_COMPANIES_TTL_MINUTES, TimeUnit.MINUTES);
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_SERIALIZING_JSON);
            }
        }

        return pageResponse;
    }
}
