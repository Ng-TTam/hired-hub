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
