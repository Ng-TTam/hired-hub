package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.AccountStatusRequest;
import com.graduation.hiredhub.dto.request.AuthResetPassRequest;
import com.graduation.hiredhub.dto.request.EmployerAccountCreationRequest;
import com.graduation.hiredhub.dto.request.UserAccountCreationRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.service.AccountService;
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

    @PostMapping("/employer/sign-up")
    ApiResponse<AuthenticationResponse> businessSignUp(@RequestBody @Valid EmployerAccountCreationRequest employerAccountCreationRequest){
        return ApiResponse.<AuthenticationResponse>builder()
                .data(accountService.employerSignUp(employerAccountCreationRequest))
                .build();
    }

    @PostMapping("update-status")
    ApiResponse<Void> updateAccountStatus(@RequestBody AccountStatusRequest accountStatusRequest) {
        accountService.updateStatus(accountStatusRequest);
        return ApiResponse.<Void>builder().build();
    }
}
