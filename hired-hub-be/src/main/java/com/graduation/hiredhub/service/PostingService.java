package com.graduation.hiredhub.service;

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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @PreAuthorize("permitAll()")
    public PostingDetailResponse getPostingDetail(String postingId){

        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        return postingMapper.toPostingDetailResponse(posting);
    }


    private Employer getEmployerByAccount(){
        return employerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }
}
