package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.CompanyDetailResponse;
import com.graduation.hiredhub.service.CompanyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("company")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    CompanyService companyService;

    @GetMapping("{id}")
    public ApiResponse<CompanyDetailResponse> findById(@PathVariable("id") String id) {
        CompanyDetailResponse companyResponse = companyService.findById(id);
        return ApiResponse.<CompanyDetailResponse>builder()
                .data(companyResponse)
                .build();
    }
}
