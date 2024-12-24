package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.AuthenticationRequest;
import com.graduation.hiredhub.dto.request.LogoutRequest;
import com.graduation.hiredhub.dto.request.RefreshRequest;
import com.graduation.hiredhub.dto.request.VerifyTokenRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.TokenResponse;
import com.graduation.hiredhub.dto.response.VerifyTokenResponse;
import com.graduation.hiredhub.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest authenticationRequest) {
        return ApiResponse.<AuthenticationResponse>builder()
                .data(authenticationService.authenticate(authenticationRequest))
                .build();
    }

    @PostMapping("/verify")
    ApiResponse<VerifyTokenResponse> verify(@RequestBody VerifyTokenRequest verifyTokenRequest)
            throws JOSEException, ParseException {
        return ApiResponse.<VerifyTokenResponse>builder()
                .data(authenticationService.verify(verifyTokenRequest))
                .build();
    }

    @PostMapping("/refresh-token")
    ApiResponse<TokenResponse> refreshToken(@RequestBody RefreshRequest refreshRequest){
        return ApiResponse.<TokenResponse>builder()
                .data(authenticationService.refreshToken(refreshRequest))
                .build();
    }

    @PostMapping("/log-out")
    ResponseEntity<String> logout(@RequestBody LogoutRequest logoutRequest){
        authenticationService.logout(logoutRequest);
        return ResponseEntity.ok("Log out successful");
    }

}
