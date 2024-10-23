package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;

    @PostMapping("/update")
    ApiResponse<UserResponse> updateProfile(@RequestBody @Valid UserRequest userCreationRequest){
        return ApiResponse.<UserResponse>builder()
                .data(userService.updateUserProfile(userCreationRequest))
                .build();
    }

    @GetMapping
    ApiResponse<UserResponse> getInfo(){
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUser())
                .build();
    }
}
