package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.JobCategoryResponse;
import com.graduation.hiredhub.service.JobCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("job-category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobCategoryController {
    JobCategoryService positionCategoryService;

    @GetMapping
    ApiResponse<List<JobCategoryResponse>> getAll() {
        return ApiResponse.<List<JobCategoryResponse>>builder()
                .data(positionCategoryService.findAll())
                .build();
    }
}
