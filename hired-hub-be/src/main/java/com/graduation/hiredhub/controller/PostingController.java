package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingDetailResponse;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.service.ApplicationService;
import com.graduation.hiredhub.service.PostingService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{postingId}/applications")
    ApiResponse<PageResponse<ApplicationDTO>> getApplicationsByPosting(
            @PathVariable String postingId,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        return ApiResponse.<PageResponse<ApplicationDTO>>builder()
                .data(applicationService.getApplications(postingId, page, size))
                .build();
    }

    @GetMapping("/{postingId}/applications/{applicationId}")
    ApiResponse<ApplicationDTO> getApplicationByPosting(@PathVariable String postingId,
                                                        @PathVariable Integer applicationId) {
        return ApiResponse.<ApplicationDTO>builder()
                .data(applicationService.getApplication(postingId, applicationId))
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
}