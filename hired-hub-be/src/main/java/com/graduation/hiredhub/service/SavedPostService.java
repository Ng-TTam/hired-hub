package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.SavePostRequest;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.SavedPostResponse;
import com.graduation.hiredhub.dto.response.SavedPostStatusResponse;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.SavedPost;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.SavedPostMapper;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.PostingRepository;
import com.graduation.hiredhub.repository.SavedPostRepository;
import com.graduation.hiredhub.service.util.PageUtils;
import com.graduation.hiredhub.service.util.SecurityUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavedPostService {
    SavedPostRepository savedPostRepository;
    SavedPostMapper savedPostMapper;
    JobSeekerRepository jobSeekerRepository;
    PostingRepository postingRepository;
    UserPreferenceService userPreferenceService;

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public PageResponse<SavedPostResponse> findAllByJobSeeker(Pageable pageable) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        Page<SavedPostResponse> page = savedPostRepository.findAllByJobSeekerId(jobSeeker.getId(), pageable)
                .map(savedPostMapper::toSavedPostResponse);
        return PageUtils.toPageResponse(page);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public void savePost(SavePostRequest savePostRequest) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        Posting posting = postingRepository.findById(savePostRequest.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.POSTING_NOT_EXISTED));

        SavedPost savedPost = savedPostRepository.findByJobSeekerIdAndPostingId(jobSeeker.getId(), posting.getId());
        if(savedPost != null) throw new AppException(ErrorCode.POSTING_SAVED);
        else savedPost = SavedPost.builder()
                .jobSeeker(jobSeeker)
                .posting(posting)
                .savedAt(Instant.now())
                .build();

        userPreferenceService.updatePreferences(jobSeeker, posting.getMainJob().getName(),
                posting.getPosition().getName(), posting.getEmployer().getCompany().getId(), "save");

        savedPostRepository.save(savedPost);
    }

    @Transactional
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public void unsavedPost(SavePostRequest savePostRequest) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        savedPostRepository.deleteByJobSeekerIdAndPostingId(jobSeeker.getId(), savePostRequest.getPostId());
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public SavedPostStatusResponse checkSavedStatus(String postingId) {
        JobSeeker jobSeeker = jobSeekerRepository.findByAccountId(SecurityUtils.getCurrentUserLogin().get())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        return SavedPostStatusResponse.builder()
                .saved(savedPostRepository.existsByJobSeekerIdAndPostingId(jobSeeker.getId(), postingId))
                .build();
    }
}
