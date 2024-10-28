package com.graduation.hiredhub.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graduation.hiredhub.dto.request.CVRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.CVResponse;
import com.graduation.hiredhub.service.CVService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/cv")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CVController {
    CVService cvService;

    @PostMapping
    ApiResponse<CVResponse> createCV(@RequestBody @Valid CVRequest cvRequest){
        return ApiResponse.<CVResponse>builder()
                .data(cvService.createCV(cvRequest))
                .build();
    }
    
}
