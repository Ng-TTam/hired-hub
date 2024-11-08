package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.response.CompanyDetailResponse;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.CompanyMapper;
import com.graduation.hiredhub.repository.CompanyRepository;
import com.graduation.hiredhub.repository.SubscriptionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyService {
    CompanyRepository companyRepository;
    SubscriptionRepository subscriptionRepository;
    CompanyMapper companyMapper;

    public CompanyDetailResponse findById(String companyId) {
        return companyRepository.findById(companyId)
                .map(company -> {
                    int followers = subscriptionRepository.countByCompanyId(companyId);
                    return companyMapper.toCompanyDetailResponse(company, followers);
                })
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_EXISTED));
    }
}
