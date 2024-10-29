package com.graduation.hiredhub.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;
    ObjectMapper mapper;

    @PostMapping("/update-profile")
    ApiResponse<UserResponse> updateProfile(@RequestPart("user") @Valid String userUpdateJson,
                                            @RequestPart("avatar") MultipartFile avatar){
        try {
            UserRequest userRequest = mapper.readValue(userUpdateJson, UserRequest.class);

            return ApiResponse.<UserResponse>builder()
                    .data(userService.updateUserProfile(userRequest, avatar))
                    .build();
        } catch (IOException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    @GetMapping
    ApiResponse<UserResponse> getInfo(){
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUser())
                .build();
    }
}
