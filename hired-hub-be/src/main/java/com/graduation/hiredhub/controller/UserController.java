package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.*;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.service.ApplicationService;
import com.graduation.hiredhub.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;
    ApplicationService applicationService;

    @PostMapping("/update-profile")
    ApiResponse<UserResponse> updateProfile(@ModelAttribute @Valid UserRequest userRequest) {
        return ApiResponse.<UserResponse>builder()
                    .data(userService.updateUserProfile(userRequest))
                    .build();
    }

    @GetMapping
    ApiResponse<UserResponse> getInfo(){
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUser())
                .build();
    }

    @GetMapping("/jobSeeker/applications")
    ApiResponse<List<ApplicationResponse>> getApplicationsByJobSeeker(){
        List<ApplicationResponse> applications = applicationService.getApplicationsByJobSeeker();
        return ApiResponse.<List<ApplicationResponse>>builder()
                .data(applications)
                .build();
    }

    @GetMapping("/pending")
    ApiResponse<PageResponse<UserResponse>> getPendingUsers(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page){
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .data(userService.getUsersPending(page, size))
                .build();
    }

    @PostMapping("/{userId}/approve")
    ApiResponse<UserResponse> getApprovedEmployer(@PathVariable String userId){
        return ApiResponse.<UserResponse>builder()
                .data(userService.approveEmployer(userId))
                .build();
    }
}
