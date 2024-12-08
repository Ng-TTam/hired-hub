package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.request.*;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
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
    JobDescriptionRepository jobDescriptionRepository;
    AccountRepository accountRepository;
    PostingMapper postingMapper;
    JobDescriptionMapper jobDescriptionMapper;
    WorkAddressMapper workAddressMapper;
    ObjectMapper objectMapper;
    AccountService accountService;
    NotificationService notificationService;

    StringRedisTemplate stringRedisTemplate;

    private static final String REDIS_POSTING_KEY = "postings";
    private static final long CACHE_POSTINGS_TTL_MINUTES = 10;

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

            //reset list posting in cache
            String redisKeyPattern = REDIS_POSTING_KEY + "*";
            Set<String> keysToDelete = stringRedisTemplate.keys(redisKeyPattern);
            if (keysToDelete != null) {
                stringRedisTemplate.delete(keysToDelete);
            }

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
    @Transactional
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PostingDetailResponse updatePosting(String postingId, PostingRequest postingRequest) {
        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        if (posting.getExpiredAt().isBefore(Instant.now()))
            throw new AppException(ErrorCode.POSTING_EXPIRED);

        postingMapper.updatePosting(posting, postingRequest);
        posting.setStatus(PostingStatus.PENDING);

        try {
            JobDescription jobDescription = jobDescriptionRepository.findById(postingRequest.getJobDescription().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.JOB_DESCRIPTION_NOT_EXISTED));
            jobDescriptionMapper.updateJobDescription(jobDescription, postingRequest.getJobDescription());

            //set jd id in list wa
            JobDescription finalJobDescription = descriptionRepository.save(jobDescription);
            List<WorkAddress> workAddresses = postingRequest
                    .getJobDescription()
                    .getWorkAddress()
                    .stream()
                    .map(workAddressDTO -> {
                        WorkAddress workAddress = workAddressRepository.findById(workAddressDTO.getId())
                                .orElseThrow(() -> new AppException(ErrorCode.WORK_ADDRESS_NOT_EXISTED));
                        workAddressMapper.updateWorkAddress(workAddress, workAddressDTO);
                        return workAddress;
                    })
                    .peek(wa -> wa.setJobDescription(finalJobDescription))
                    .toList();
            workAddresses = workAddressRepository.saveAll(workAddresses);

            jobDescription.setWorkAddress(workAddresses);
            posting.setJobDescription(jobDescription);

            posting = postingRepository.save(posting);

            //reset list posting in cache
            //another way is set posting in cache if exist (complex)
            String redisKeyPattern = REDIS_POSTING_KEY + "*";
            Set<String> keysToDelete = stringRedisTemplate.keys(redisKeyPattern);
            if (keysToDelete != null) {
                stringRedisTemplate.delete(keysToDelete);
            }

            return postingMapper.toPostingDetailResponse(posting);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    @PreAuthorize("permitAll()")
    public PageResponse<PostingDetailResponse> getAllPostings(int page, int size) {
        String cacheKey = REDIS_POSTING_KEY + "_page_" + page + "_size_" + size;
        PageResponse<PostingDetailResponse> pageResponse;

        // Check in cache
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(cacheKey))) {
            try {
                pageResponse = objectMapper.readValue(stringRedisTemplate.opsForValue().get(cacheKey),
                        new TypeReference<PageResponse<PostingDetailResponse>>() {
                        });
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_PARSING_JSON);
            }
        } else {
            Pageable pageable = PageRequest.of(page - 1, size,
                    Sort.by(
                            Sort.Order.desc("createdAt"),
                            Sort.Order.asc("title")
                    )
            );
            Page<Posting> pageData = postingRepository.findByStatus(PostingStatus.ACTIVATE, pageable);

            pageResponse = PageResponse.<PostingDetailResponse>builder()
                    .currentPage(page)
                    .pageSize(pageData.getSize())
                    .totalPages(pageData.getTotalPages())
                    .totalElements(pageData.getTotalElements())
                    .data(pageData.getContent().stream()
                            .map(postingMapper::toPostingDetailResponse)
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

    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<PostingResponse> employerFilter(EmployerPostingFilterCriteria criteria, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(
                        Sort.Order.desc("createdAt"),
                        Sort.Order.asc("title"),
                        Sort.Order.asc("expiredAt")
                )
        );
        Specification<Posting> spec = Specification.where(null);
        if (criteria.getSearchValue() != null) {
            spec = spec.and(PostingSpecifications.withSearchText(criteria.getSearchValue()));
        }
        if (criteria.getStatus() != null) {
            spec = spec.and(PostingSpecifications.hasStatus(criteria.getStatus()));
        }
        spec = spec.and(PostingSpecifications.hasEmployer(getEmployerByAccount()));
        Page<PostingResponse> page = postingRepository.findAll(spec, sortedPageable)
                .map(postingMapper::toPostingResponse);
        return PageUtils.toPageResponse(page);
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

        PostingStatus oldStatus = posting.getStatus();

        posting.setStatus(postingStatusRequest.getStatus());

        //another way is set posting in cache if exist (complex)
        String redisKeyPattern = REDIS_POSTING_KEY + "*";
        Set<String> keysToDelete = stringRedisTemplate.keys(redisKeyPattern);
        if (keysToDelete != null) {
            stringRedisTemplate.delete(keysToDelete);
        }

        postingRepository.save(posting);

        if (oldStatus.equals(PostingStatus.PENDING)) {
            if (posting.getStatus().equals(PostingStatus.ACTIVATE)) {
                notificationService.onCompanyNewPost(posting);
            }
            notificationService.onPostingStatusChange(posting, true);
        }
    }

    // Lên lịch chạy mỗi ngày lúc 12 giờ đêm
//    @Scheduled(cron = "0 0 0 * * ?")
    @Scheduled(initialDelay = 5000, fixedDelay = Long.MAX_VALUE)
    public void scheduleChangeStatusPostingExpire() {
        List<Posting> expiredPosts = postingRepository.findExpiredPosts();
        expiredPosts.forEach(posting -> posting.setStatus(PostingStatus.DEACTIVATE));
        postingRepository.saveAll(expiredPosts);

        notificationService.onPostingExpired(expiredPosts);
    }

    // Gửi thông báo mỗi ngày lúc 12h
    @Scheduled(cron = "0 0 12 * * ?")
    public void notifyAboutExpiringPostings() {
        List<Posting> expiringPostings = getExpiringPostingsWithinDays(2);
        notificationService.onPostingExpiring(expiringPostings);
    }

    public List<Posting> getExpiringPostingsWithinDays(long days) {
        Instant currentDate = Instant.now();
        Instant futureDate = currentDate.plus(days, ChronoUnit.DAYS);
        return postingRepository.findExpiringPostsWithinDays(currentDate, futureDate);
    }
}
