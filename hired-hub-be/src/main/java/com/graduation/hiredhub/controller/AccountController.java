package com.graduation.hiredhub.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.request.UserAccountCreationRequest;
import com.graduation.hiredhub.dto.request.AuthResetPassRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.service.AccountService;
import com.graduation.hiredhub.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountController {
    AccountService accountService;
    UserService userService;
    ObjectMapper mapper;

    //3 endpoint below to sign up function
    @PostMapping("/sign-up")
    ApiResponse<AuthenticationResponse> signUp(@RequestBody @Valid UserAccountCreationRequest accountCreationRequest){
        return ApiResponse.<AuthenticationResponse>builder()
                .data(accountService.signUp(accountCreationRequest))
                .build();
    }

    @PostMapping("/verify-otp")
    ApiResponse<String> verifyOtp(@RequestParam String otp){
        return ApiResponse.<String>builder()
                .data(accountService.verifyOtp(otp))
                .build();
    }

    @PostMapping("/update-profile")
    ApiResponse<UserResponse> updateProfile(@RequestPart("user") String userUpdateJson,
                                            @RequestPart("avatar") MultipartFile avatar){
        try {
            UserRequest userRequest = mapper.readValue(userUpdateJson, UserRequest.class);

            return ApiResponse.<UserResponse>builder()
                    .data(userService.updateUserProfile(userRequest, avatar))
                    .build();
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    @GetMapping("/resend-otp")
    ApiResponse<String> resendOtpSignUp(){
        accountService.resendOtpSignUp();
        return ApiResponse.<String>builder()
                .data("Resend otp successfully. Please check your email!!!")
                .build();
    }

    //3 endpoint below to reset password function if user forgot pass
    @PostMapping("/send-reset-otp")
    ApiResponse<String> sendResetPasswordOtp(@RequestBody AuthResetPassRequest authResetPassRequest){
        accountService.otpResetPassword(authResetPassRequest);
        return ApiResponse.<String>builder()
                .data("Send otp successful")
                .build();
    }

    @PostMapping("/verify-reset-otp")
    ApiResponse<String> verifyResetPasswordOtp(@RequestBody AuthResetPassRequest authResetPassRequest,
                                               @RequestParam String otp){
        return ApiResponse.<String>builder()
                .data(accountService.verifyOtpResetPassword(authResetPassRequest, otp))
                .build();
    }

    @PostMapping("/forgot-password")
    ApiResponse<Boolean> resetPassword(@RequestBody AuthResetPassRequest authResetPassRequest,
                                       @RequestParam String key){
        return ApiResponse.<Boolean>builder()
                .data(accountService.resetPassword(authResetPassRequest, key))
                .build();
    }
}
