package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.PageResponse;
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
    public PostingResponse createPosting(PostingRequest postingRequest){
        Posting posting = postingMapper.toPosting(postingRequest);
        posting.setEmployer(getEmployerByAccount());
        try{
            postingRepository.save(posting);
        }catch (Exception e){
            throw  new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return postingMapper.toPostingResponse(posting);
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public PostingResponse updatePosting(PostingRequest postingRequest){
        Posting posting = postingRepository.findByEmployer(getEmployerByAccount()).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED));
        postingMapper.updatePosting(posting, postingRequest);
        try{
            postingRepository.save(posting);
        }catch (Exception e){
            throw  new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return postingMapper.toPostingResponse(posting);
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public PageResponse<PostingResponse> getPostings(int page, int size){
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

    private Employer getEmployerByAccount(){
        return employerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }
}
