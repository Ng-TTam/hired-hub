package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.SubscriptionRequest;
import com.graduation.hiredhub.dto.response.SubscriptionStatusResponse;
import com.graduation.hiredhub.entity.Company;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.Subscription;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.CompanyRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.SubscriptionRepository;
import com.graduation.hiredhub.service.util.SecurityUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SubscriptionService {
    SubscriptionRepository subscriptionRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final CompanyRepository companyRepository;

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public SubscriptionStatusResponse checkSubscriptionStatus(String companyId) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get()).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        boolean subscribed = subscriptionRepository.existsByJobSeekerIdAndCompanyId(jobSeeker.getId(), companyId);
        return SubscriptionStatusResponse.builder()
                .subscribed(subscribed)
                .build();
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public void createSubscription(SubscriptionRequest subscriptionRequest) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get()).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        Company company = companyRepository.findById(subscriptionRequest.getCompanyId())
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_EXISTED));
        if (Boolean.TRUE.equals(subscriptionRepository.existsByJobSeekerIdAndCompanyId(jobSeeker.getId(), company.getId()))) {
            return;
        }
        Subscription subscription = Subscription.builder()
                .jobSeeker(jobSeeker)
                .company(company)
                .build();
        subscriptionRepository.save(subscription);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    @Transactional
    public void deleteSubscription(SubscriptionRequest subscriptionRequest) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get()).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        subscriptionRepository.deleteByJobSeekerIdAndCompanyId(
                jobSeeker.getId(),
                subscriptionRequest.getCompanyId()
        );
    }
}
