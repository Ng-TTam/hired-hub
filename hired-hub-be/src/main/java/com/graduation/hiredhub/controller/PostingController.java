package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.PostingRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.service.PostingService;
import io.lettuce.core.dynamic.annotation.Param;
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

    @PostMapping
    ApiResponse<PostingResponse> createPosting(@RequestBody @Valid PostingRequest postingRequest){
        return ApiResponse.<PostingResponse>builder()
                .data(postingService.createPosting(postingRequest))
                .build();
    }

    @PutMapping
    ApiResponse<PostingResponse> updatePosting(@RequestBody @Valid PostingRequest postingRequest){
        return ApiResponse.<PostingResponse>builder()
                .data(postingService.createPosting(postingRequest))
                .build();
    }

    @GetMapping
    ApiResponse<PageResponse<PostingResponse>> getPostings(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page){
        return ApiResponse.<PageResponse<PostingResponse>>builder()
                .data(postingService.getPostings(size, page))
                .build();
    }

}
