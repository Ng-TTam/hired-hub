package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.request.PostingFilterCriteria;
import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.*;
import com.graduation.hiredhub.service.ApplicationService;
import com.graduation.hiredhub.service.PostingService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posting")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostingController {
    PostingService postingService;
    ApplicationService applicationService;

    @PostMapping
    ApiResponse<PostingDetailResponse> createPosting(@RequestBody @Valid PostingRequest postingRequest) {
        return ApiResponse.<PostingDetailResponse>builder()
                .data(postingService.createPosting(postingRequest))
                .build();
    }

    @PutMapping("/{postingId}")
    ApiResponse<PostingDetailResponse> updatePosting(@PathVariable String postingId, @RequestBody @Valid PostingRequest postingRequest) {
        return ApiResponse.<PostingDetailResponse>builder()
                .data(postingService.updatePosting(postingId, postingRequest))
                .build();
    }

    @GetMapping("/all")
    ApiResponse<PageResponse<PostingResponse>> getAllPosting(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page){
        return ApiResponse.<PageResponse<PostingResponse>>builder()
                .data(postingService.getAllPostings(page, size))
                .build();
    }

    @PostMapping("/{postingId}/approve")
    ApiResponse<String> approvePosting(@PathVariable String postingId){
        postingService.approvePosting(postingId);
        return ApiResponse.<String>builder()
                .data("Approve successful!")
                .build();
    }

    @PostMapping("/{postingId}/save")
    ApiResponse<String> savedPosting(@PathVariable String postingId){
        postingService.savedPost(postingId);
        return ApiResponse.<String>builder()
                .data("Save post successful!")
                .build();
    }

    @DeleteMapping("/{postingId}/unsave")
    ApiResponse<String> unsavedPosting(@PathVariable String postingId){
        postingService.unSavedPost(postingId);
        return ApiResponse.<String>builder()
                .data("Unsave post successful!")
                .build();
    }

    @GetMapping("/self")
    ApiResponse<PageResponse<PostingResponse>> getPostingsByEmployer(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        return ApiResponse.<PageResponse<PostingResponse>>builder()
                .data(postingService.getPostingsByEmployer(page, size))
                .build();
    }

    @GetMapping("/{postingId}")
    ApiResponse<PostingDetailResponse> getPosting(@PathVariable String postingId) {
        return ApiResponse.<PostingDetailResponse>builder()
                .data(postingService.getPostingDetail(postingId))
                .build();
    }

    @GetMapping("/pending")
    ApiResponse<List<PostingResponse>> getPostingPending() {
        return ApiResponse.<List<PostingResponse>>builder()
                .data(postingService.getPostingPending())
                .build();
    }

    @PostMapping("/{postingId}/jobSeeker/application/{cvId}")
    ApiResponse<ApplicationResponse> createApplication(@PathVariable String postingId,
                                                       @PathVariable String cvId){
        return ApiResponse.<ApplicationResponse>builder()
                .data(applicationService.createApplication(postingId, cvId))
                .message("Successfully")
                .build();
    }

    @GetMapping("/{postingId}/jobSeeker/applications/{applicationId}")
    ApiResponse<ApplicationResponse> getApplicationJobSeeker(@PathVariable String postingId,
                                                             @PathVariable Integer applicationId){
        return ApiResponse.<ApplicationResponse>builder()
                .data(applicationService.getApplicationByJobSeeker(postingId,applicationId))
                .message("Successfully")
                .build();
    }

    @DeleteMapping("/{postingId}/jobSeeker/application/{applicationId}")
    ApiResponse<ApplicationResponse> deleteApplication(@PathVariable String postingId,
                                                       @PathVariable Integer applicationId){
        return ApiResponse.<ApplicationResponse>builder()
                .data(applicationService.deleteApplication(postingId, applicationId))
                .message("Successfully")
                .build();
    }

    @GetMapping("/{postingId}/applications")
    ApiResponse<PageResponse<ApplicationDTO>> getApplicationsByPosting(
            @PathVariable String postingId,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        return ApiResponse.<PageResponse<ApplicationDTO>>builder()
                .data(applicationService.getApplicationsByEmployer(postingId, page, size))
                .build();
    }

    @GetMapping("/{postingId}/applications/{applicationId}")
    ApiResponse<ApplicationDTO> getApplicationByPosting(@PathVariable String postingId,
                                                        @PathVariable Integer applicationId) {
        return ApiResponse.<ApplicationDTO>builder()
                .data(applicationService.getApplicationByEmployer(postingId, applicationId))
                .build();
    }

    @PutMapping("/{postingId}/applications/{applicationId}")
    ApiResponse<ApplicationDTO> responseApplicationInPosting(@PathVariable String postingId,
                                                             @PathVariable Integer applicationId,
                                                             @RequestBody @Valid ApplicationDTO applicationDTO) {
        return ApiResponse.<ApplicationDTO>builder()
                .data(applicationService.updateApplication(postingId, applicationId, applicationDTO))
                .build();
    }

    /**
     * {@code GET /posting} get a page of Posting
     *
     * @param criteria the filter information
     * @param pageable the pagination information
     * @return {@link PageResponse} with list of {@link PostingDetailResponse} in data and status {@code 200 (OK)}
     */
    @GetMapping
    public ApiResponse<PageResponse<PostingDetailResponse>> filter(PostingFilterCriteria criteria, Pageable pageable) {
        PageResponse<PostingDetailResponse> page = postingService.filter(criteria, pageable);
        return ApiResponse.<PageResponse<PostingDetailResponse>>builder()
                .data(page)
                .build();
    }
}
