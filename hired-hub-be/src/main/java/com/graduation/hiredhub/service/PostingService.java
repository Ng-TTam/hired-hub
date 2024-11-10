package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.PostingFilterCriteria;
import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingDetailResponse;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.PostingMapper;
import com.graduation.hiredhub.repository.EmployerRepository;
import com.graduation.hiredhub.repository.PostingRepository;
import com.graduation.hiredhub.repository.specification.PostingSpecifications;
import com.graduation.hiredhub.service.util.PageUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostingService {
    PostingRepository postingRepository;
    EmployerRepository employerRepository;
    PostingMapper postingMapper;
    AccountService accountService;

    /**
     *
     * @param postingRequest
     * @return posting
     */
    @PreAuthorize("hasRole('EMPLOYER')")
    public PostingDetailResponse createPosting(PostingRequest postingRequest){
        Posting posting = postingMapper.toPosting(postingRequest);
        posting.setEmployer(getEmployerByAccount());
        try{
            postingRepository.save(posting);
        }catch (Exception e){
            throw  new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return postingMapper.toPostingDetailResponse(posting);
    }

    /**
     * Only employer posting can be update post
     *
     * @param postingId
     * @param postingRequest
     * @return posting
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PostingDetailResponse updatePosting(String postingId, PostingRequest postingRequest){
        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        if( !getEmployerByAccount().getId().equals(posting.getEmployer().getId()))
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);

        postingMapper.updatePosting(posting, postingRequest);
        try{
            postingRepository.save(posting);
        }catch (Exception e){
            throw  new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return postingMapper.toPostingDetailResponse(posting);
    }

    /**
     * Get postings employer post
     *
     * @param page
     * @param size
     * @return
     */
    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<PostingResponse> getPostingsByEmployer(int page, int size){
        Pageable pageable = PageRequest.of(page - 1,size);
        var pageData = postingRepository.findByEmployer(getEmployerByAccount(), pageable);
        return PageResponse.<PostingResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(postingMapper::toPostingResponse).toList())
                .build();
    }

    /**
     * All user can be get post detail
     *
     * @param postingId
     * @return posting
     */
    @PreAuthorize("permitAll()")
    public PostingDetailResponse getPostingDetail(String postingId){

        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        return postingMapper.toPostingDetailResponse(posting);
    }


    private Employer getEmployerByAccount() {
        return employerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }

    public PageResponse<PostingDetailResponse> filter(PostingFilterCriteria criteria, Pageable pageable) {
        Specification<Posting> spec = Specification.where(null);

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
}
