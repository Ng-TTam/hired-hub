package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.UserAccountCreationRequest;
import com.graduation.hiredhub.dto.request.AuthResetPassRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.service.impl.AccountService;
import com.graduation.hiredhub.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountController {
    AccountService accountService;
    UserService userService;

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
    ApiResponse<UserResponse> updateProfile(@RequestParam UserRequest userCreationRequest){
        return ApiResponse.<UserResponse>builder()
                .data(userService.updateUserProfile(userCreationRequest))
                .build();
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
