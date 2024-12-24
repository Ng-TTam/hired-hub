package com.graduation.hiredhub.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.graduation.hiredhub.dto.request.EmployerCompanyUpdateRequest;
import com.graduation.hiredhub.dto.request.UserFilterCriteria;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.service.ApplicationService;
import com.graduation.hiredhub.service.UserPreferenceService;
import com.graduation.hiredhub.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;
    ApplicationService applicationService;
    UserPreferenceService userPreferenceService;

    @PostMapping("/update-profile")
    ApiResponse<UserResponse> updateProfile(@ModelAttribute @Valid UserRequest userRequest) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.updateUserProfile(userRequest))
                .build();
    }

    @GetMapping
    ApiResponse<UserResponse> getInfo() {
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUser())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<Object> findById(@PathVariable("id") String id) {
        return ApiResponse.builder()
                .data(userService.findById(id))
                .build();
    }

    @GetMapping("/jobSeeker/applications")
    ApiResponse<List<ApplicationResponse>> getApplicationsByJobSeeker() {
        List<ApplicationResponse> applications = applicationService.getApplicationsByJobSeeker();
        return ApiResponse.<List<ApplicationResponse>>builder()
                .data(applications)
                .build();
    }

    @GetMapping("/pending")
    ApiResponse<PageResponse<UserResponse>> getPendingUsers(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .data(userService.getUsersPending(page, size))
                .build();
    }

    @PostMapping("/{userId}/approve")
    ApiResponse<UserResponse> getApprovedEmployer(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.approveEmployer(userId))
                .build();
    }

    @PostMapping("/update-company-info")
    ApiResponse<Void> updateEmployerCompany(@RequestBody EmployerCompanyUpdateRequest employerCompanyUpdateRequest) {
        userService.updateEmployerCompany(employerCompanyUpdateRequest);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("all")
    ApiResponse<PageResponse<UserResponse>> getAllUsers(
            UserFilterCriteria criteria, Pageable pageable
    ) {
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .data(userService.filter(criteria, pageable))
                .build();
    }

//    @PostMapping("/action")
//    public ApiResponse<Void> logUserAction(
//            @RequestParam String job,
//            @RequestParam String position,
//            @RequestParam String companyId,
//            @RequestParam String action) throws JsonProcessingException {
//        userPreferenceService.updatePreferences(job, position, companyId, action);
//        return ApiResponse.<Void>builder().build();
//    }
}
