package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.SavePostRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.SavedPostResponse;
import com.graduation.hiredhub.dto.response.SavedPostStatusResponse;
import com.graduation.hiredhub.service.SavedPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("saved-post")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavedPostController {
    SavedPostService savedPostService;

    @GetMapping
    public ApiResponse<PageResponse<SavedPostResponse>> getAllSavedPost(Pageable pageable) {
        return ApiResponse.<PageResponse<SavedPostResponse>>builder()
                .data(savedPostService.findAllByJobSeeker(pageable))
                .build();
    }

    @GetMapping("check-status")
    public ApiResponse<SavedPostStatusResponse> checkSavedStatus(@RequestParam("postingId") String postingId) {
        return ApiResponse.<SavedPostStatusResponse>builder()
                .data(savedPostService.checkSavedStatus(postingId))
                .build();
    }

    @PostMapping
    public ApiResponse<Void> savePost(@RequestBody SavePostRequest savePostRequest) {
        savedPostService.savePost(savePostRequest);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("unsaved-post")
    public ApiResponse<Void> unsavedPost(@RequestBody SavePostRequest savePostRequest) {
        savedPostService.unsavedPost(savePostRequest);
        return ApiResponse.<Void>builder().build();
    }
}
