package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.PositionCategoryResponse;
import com.graduation.hiredhub.service.PositionCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("position-category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PositionCategoryController {
    PositionCategoryService positionCategoryService;

    @GetMapping
    ApiResponse<List<PositionCategoryResponse>> getAll() {
        return ApiResponse.<List<PositionCategoryResponse>>builder()
                .data(positionCategoryService.findAll())
                .build();
    }
}
