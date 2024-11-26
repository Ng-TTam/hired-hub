package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.request.AdminPostingFilterCriteria;
import com.graduation.hiredhub.dto.request.PostingFilterCriteria;
import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.request.PostingStatusRequest;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingDetailResponse;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.entity.*;
import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.JobDescriptionMapper;
import com.graduation.hiredhub.mapper.PostingMapper;
import com.graduation.hiredhub.mapper.WorkAddressMapper;
import com.graduation.hiredhub.repository.*;
import com.graduation.hiredhub.repository.specification.PostingSpecifications;
import com.graduation.hiredhub.service.util.PageUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostingService {
    PostingRepository postingRepository;
    EmployerRepository employerRepository;
    JobDescriptionRepository descriptionRepository;
    WorkAddressRepository workAddressRepository;
    PostingMapper postingMapper;
    JobDescriptionMapper jobDescriptionMapper;
    WorkAddressMapper workAddressMapper;
    ObjectMapper objectMapper;
    AccountService accountService;
    NotificationService notificationService;

    StringRedisTemplate stringRedisTemplate;

    private static final String REDIS_POSTING_KEY = "postings";
    private static final long CACHE_POSTINGS_TTL_MINUTES = 10;
    private final AccountRepository accountRepository;

    /**
     * Employer posting with status pending, wait admin approve post: pending -> active
     *
     * @param postingRequest posting to create
     * @return posting
     */
    @Transactional
    @PreAuthorize("hasRole('EMPLOYER')")
    public PostingDetailResponse createPosting(PostingRequest postingRequest) {
        Employer employer = getEmployerByAccount();
        if (employer.getAccount().getStatus() == Status.PENDING)
            throw new AppException(ErrorCode.EMPLOYER_PENDING);

        Posting posting = postingMapper.toPosting(postingRequest);
        posting.setEmployer(employer);
        posting.setStatus(PostingStatus.PENDING);

        try {
            JobDescription jobDescription = jobDescriptionMapper.toJobDescription(postingRequest.getJobDescription());
            jobDescription = descriptionRepository.save(jobDescription);

            //set jd id in list wa
            JobDescription finalJobDescription = jobDescription;
            List<WorkAddress> workAddresses = postingRequest
                    .getJobDescription()
                    .getWorkAddress()
                    .stream()
                    .map(workAddressMapper::toWorkAddress)
                    .peek(wa -> wa.setJobDescription(finalJobDescription))
                    .toList();
            workAddresses = workAddressRepository.saveAll(workAddresses);

            jobDescription.setWorkAddress(workAddresses);
            posting.setJobDescription(jobDescription);

            posting = postingRepository.save(posting);
            return postingMapper.toPostingDetailResponse(posting);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    /**
     * Only employer posting can be update post
     * Posting have status is PENDING can update
     *
     * @param postingId:      id posting
     * @param postingRequest: posting field need update
     * @return posting
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PostingDetailResponse updatePosting(String postingId, PostingRequest postingRequest) {
        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        if (posting.getExpiredAt().isBefore(Instant.now()))
            throw new AppException(ErrorCode.POSTING_EXPIRED);

        postingMapper.updatePosting(posting, postingRequest);
        try {
            postingRepository.save(posting);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return postingMapper.toPostingDetailResponse(posting);
    }

    /**
     * Get postings employer post
     *
     * @param page: current page
     * @param size: size of one page
     * @return Page of posting response
     */
    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<PostingResponse> getPostingsByEmployer(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        var pageData = postingRepository.findByEmployer(getEmployerByAccount(), pageable);
        return PageResponse.<PostingResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(postingMapper::toPostingResponse).toList())
                .build();
    }

    @PreAuthorize("permitAll()")
    public PageResponse<PostingResponse> getAllPostings(int page, int size) {
        String cacheKey = REDIS_POSTING_KEY + "_page_" + page + "_size_" + size;
        PageResponse<PostingResponse> pageResponse;

        // Check in cache
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(cacheKey))) {
            try {
                pageResponse = objectMapper.readValue(stringRedisTemplate.opsForValue().get(cacheKey),
                        new TypeReference<PageResponse<PostingResponse>>() {
                        });
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_PARSING_JSON);
            }
        } else {
            Pageable pageable = PageRequest.of(page - 1, size,
                    Sort.by(
                            Sort.Order.asc("title"),
                            Sort.Order.desc("createdAt")
                    )
            );
            Page<Posting> pageData = postingRepository.findAll(pageable);

            pageResponse = PageResponse.<PostingResponse>builder()
                    .currentPage(page)
                    .pageSize(pageData.getSize())
                    .totalPages(pageData.getTotalPages())
                    .totalElements(pageData.getTotalElements())
                    .data(pageData.getContent().stream()
                            .map(postingMapper::toPostingResponse)
                            .toList())
                    .build();

            // converted from Object to JSON before save in Redis
            try {
                String jsonResponse = objectMapper.writeValueAsString(pageResponse);
                stringRedisTemplate.opsForValue().set(cacheKey, jsonResponse, CACHE_POSTINGS_TTL_MINUTES, TimeUnit.MINUTES);
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_SERIALIZING_JSON);
            }
        }

        return pageResponse;
    }


    @PreAuthorize("permitAll()")
    public PostingDetailResponse getPostingDetail(String postingId) {

        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        return postingMapper.toPostingDetailResponse(posting);
    }

    private Employer getEmployerByAccount() {
        return employerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }

    public PageResponse<PostingDetailResponse> filter(PostingFilterCriteria criteria, Pageable pageable) {
        Specification<Posting> spec = Specification
                .where(PostingSpecifications.hasStatus(PostingStatus.ACTIVATE));

        if (criteria.getSearchValue() != null) {
            spec = spec.and(PostingSpecifications.withSearchText(criteria.getSearchValue()));
        }
        if (criteria.getProvinceId() != null) {
            spec = spec.and(PostingSpecifications.hasProvince(criteria.getProvinceId()));
        }
        if (criteria.getDistrictId() != null) {
            spec = spec.and(PostingSpecifications.hasDistrict(criteria.getDistrictId()));
        }
        if (criteria.getMinSalary() != null || criteria.getMaxSalary() != null) {
            spec = spec.and(PostingSpecifications.hasSalaryInRange(criteria.getMinSalary(), criteria.getMaxSalary()));
        }
        if (criteria.getJobCategoryId() != null) {
            spec = spec.and(PostingSpecifications.hasJobCategory(criteria.getJobCategoryId()));
        }
        if (criteria.getJobType() != null) {
            spec = spec.and(PostingSpecifications.hasJobType(criteria.getJobType()));
        }
        if (criteria.getPositionId() != null) {
            spec = spec.and(PostingSpecifications.hasPositionCategory(criteria.getPositionId()));
        }
        if (criteria.getExperienceRequire() != null) {
            spec = spec.and(PostingSpecifications.hasExperienceRequire(criteria.getExperienceRequire()));
        }

        return PageUtils.toPageResponse(postingRepository.findAll(spec, pageable).map(postingMapper::toPostingDetailResponse));
    }

    public PageResponse<PostingDetailResponse> findByCompany(String companyId, String searchText, Integer provinceId, Pageable pageable) {
        Specification<Posting> spec = Specification.where(PostingSpecifications.hasCompany(companyId));
        if (searchText != null) {
            spec = spec.and(PostingSpecifications.hasTitle(searchText));
        }
        if (provinceId != null) {
            spec = spec.and(PostingSpecifications.hasProvince(provinceId));
        }
        Page<Posting> page = postingRepository.findAll(spec, pageable);
        return PageUtils.toPageResponse(page.map(postingMapper::toPostingDetailResponse));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<PostingDetailResponse> adminFilter(AdminPostingFilterCriteria criteria, Pageable pageable) {
        Specification<Posting> spec = Specification.where(null);
        if (criteria.getSearchValue() != null) {
            spec = spec.and(PostingSpecifications.withSearchText(criteria.getSearchValue()));
        }
        if (criteria.getProvinceId() != null) {
            spec = spec.and(PostingSpecifications.hasProvince(criteria.getProvinceId()));
        }
        if (criteria.getJobCategoryId() != null) {
            spec = spec.and(PostingSpecifications.hasJobCategory(criteria.getJobCategoryId()));
        }
        if (criteria.getStatus() != null) {
            spec = spec.and(PostingSpecifications.hasStatus(criteria.getStatus()));
        }

        Page<PostingDetailResponse> page = postingRepository.findAll(spec, pageable)
                .map(postingMapper::toPostingDetailResponse);
        return PageUtils.toPageResponse(page);
    }

    @PreAuthorize("hasRole('ADMIN') or @postingSecurity.isPostingOwner(#postingStatusRequest.postingId,  authentication.name)")
    public void updatePostingStatus(PostingStatusRequest postingStatusRequest) {
        Posting posting = postingRepository.findById(postingStatusRequest.getPostingId())
                .orElseThrow(() -> new AppException(ErrorCode.POSTING_NOT_EXISTED));
        Account account = accountRepository.findById(SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        if (account.getRole().equals(Role.EMPLOYER)
                && (postingStatusRequest.getStatus().equals(PostingStatus.PENDING)
                || posting.getStatus().equals(PostingStatus.PENDING))) {
            throw new AppException(ErrorCode.POSTING_PENDING);
        }
        posting.setStatus(postingStatusRequest.getStatus());
        postingRepository.save(posting);

        if (posting.getStatus().equals(PostingStatus.ACTIVATE)) {
            notificationService.onCompanyNewPost(posting);
        }
    }
}
