package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.UserChangeInfoRequest;
import com.graduation.hiredhub.dto.request.UserChangePassRequest;
import com.graduation.hiredhub.dto.request.UserCreationRequest;
import com.graduation.hiredhub.dto.response.*;
import com.graduation.hiredhub.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping
    public ApiResponse<UserResponse> register(@RequestBody @Valid UserCreationRequest userRequest){
        return ApiResponse.<UserResponse>builder()
                .result(userService.registerUser(userRequest))
                .build();
    }

    @GetMapping()
    public ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getListUser())
                .build();
    }

    @GetMapping("/info")
    public ApiResponse<UserResponse> getUserInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getInfo())
                .build();
    }

    @PostMapping("/change-password")
    public ApiResponse<UserResponse> changePassword(@RequestBody UserChangePassRequest userChangePassRequest){
        return ApiResponse.<UserResponse>builder()
                .result(userService.changePassUser(userChangePassRequest))
                .build();
    }

    @PostMapping("/change-info")
    public ApiResponse<UserResponse> changeInfo(@RequestBody UserChangeInfoRequest userChangeInfoRequest){
        return ApiResponse.<UserResponse>builder()
                .result(userService.changeInfoUser(userChangeInfoRequest))
                .build();
    }

    @DeleteMapping("/{userId}")
    public ApiResponse<Void> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return ApiResponse.<Void>builder().build();
    }

    @DeleteMapping("/delete/owner")
    public ApiResponse<Void> deleteOwnerUser(){
        userService.deleteUser();
        return ApiResponse.<Void>builder().build();
    }
}