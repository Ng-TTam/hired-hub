package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.JobCategoryCreateRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.JobCategoryResponse;
import com.graduation.hiredhub.service.JobCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("job-category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobCategoryController {
    JobCategoryService jobCategoryService;

    @GetMapping
    ApiResponse<List<JobCategoryResponse>> getAll() {
        return ApiResponse.<List<JobCategoryResponse>>builder()
                .data(jobCategoryService.findAll())
                .build();
    }

    @PostMapping
    ApiResponse<JobCategoryResponse> createJobCategory(@RequestBody JobCategoryCreateRequest jobCategoryCreateRequest) {
        return ApiResponse.<JobCategoryResponse>builder()
                .data(jobCategoryService.createJobCategory(jobCategoryCreateRequest))
                .build();
    }
}
