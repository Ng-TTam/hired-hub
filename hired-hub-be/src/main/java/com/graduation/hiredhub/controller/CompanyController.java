package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.AdminCompanyFilterCriteria;
import com.graduation.hiredhub.dto.request.CompanyCreationRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.CompanyDetailResponse;
import com.graduation.hiredhub.dto.response.CompanyResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.service.CompanyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    CompanyService companyService;

    @GetMapping("/{companyId}")
    public ApiResponse<CompanyDetailResponse> findById(@PathVariable("companyId") String id) {
        return ApiResponse.<CompanyDetailResponse>builder()
                .data(companyService.findById(id))
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<CompanyResponse>> getAllCompanies(
            @RequestParam(value = "companyName", required = false) String companyName,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<CompanyResponse>>builder()
                .data(companyService.getAllCompany(companyName, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<CompanyResponse> create(@ModelAttribute CompanyCreationRequest companyCreationRequest) {
        return ApiResponse.<CompanyResponse>builder()
                .data(companyService.createCompany(companyCreationRequest))
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<PageResponse<CompanyResponse>> filter(
            AdminCompanyFilterCriteria criteria, Pageable pageable) {
        return ApiResponse.<PageResponse<CompanyResponse>>builder()
                .data(companyService.filter(criteria, pageable))
                .build();
    }

    @GetMapping("/self")
    public ApiResponse<CompanyResponse> getByCurrentUserLogin() {
        return ApiResponse.<CompanyResponse>builder()
                .data(companyService.findByCurrentUserLogin())
                .build();
    }
}
