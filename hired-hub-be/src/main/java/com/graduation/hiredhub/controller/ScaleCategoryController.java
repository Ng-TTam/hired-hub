package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.ScaleCategoryResponse;
import com.graduation.hiredhub.service.ScaleCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("scale-category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScaleCategoryController {
    ScaleCategoryService scaleCategoryService;

    @GetMapping
    public ApiResponse<List<ScaleCategoryResponse>> findAll() {
        return ApiResponse.<List<ScaleCategoryResponse>>builder()
                .data(scaleCategoryService.findAll())
                .build();
    }
}
