package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.AuthenticationRequest;
import com.graduation.hiredhub.dto.request.LogoutRequest;
import com.graduation.hiredhub.dto.request.RefreshRequest;
import com.graduation.hiredhub.dto.request.VerifyTokenRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.TokenResponse;
import com.graduation.hiredhub.dto.response.VerifyTokenResponse;
import com.graduation.hiredhub.service.impl.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.authenticate(authenticationRequest))
                .build();
    }

    @PostMapping("/verify")
    ApiResponse<VerifyTokenResponse> verify(@RequestBody VerifyTokenRequest verifyTokenRequest)
            throws JOSEException, ParseException {
        return ApiResponse.<VerifyTokenResponse>builder()
                .result(authenticationService.verify(verifyTokenRequest))
                .build();
    }

    @PostMapping("/refresh-token")
    ApiResponse<TokenResponse> refreshToken(@RequestBody RefreshRequest refreshRequest)
            throws JOSEException, ParseException {
        return ApiResponse.<TokenResponse>builder()
                .result(authenticationService.refreshToken(refreshRequest))
                .build();
    }

    @PostMapping("/log-out")
    ResponseEntity<String> logout(@RequestBody LogoutRequest logoutRequest) throws ParseException, JOSEException {
        authenticationService.logout(logoutRequest);
        return ResponseEntity.ok("Log out successful");
    }

}
