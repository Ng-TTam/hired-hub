package com.graduation.hiredhub.controller;

import org.springframework.web.bind.annotation.*;

import com.graduation.hiredhub.dto.request.CVRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.CVResponse;
import com.graduation.hiredhub.service.CVService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;


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
    
    @PutMapping("/{cvId}")
    ApiResponse<CVResponse> updateCV(
            @PathVariable String cvId,
            @RequestBody @Valid CVRequest cvRequest) {
        
        CVResponse updatedCV = cvService.updateCV(cvId, cvRequest);
        
        return ApiResponse.<CVResponse>builder()
                .data(updatedCV)
                .build();
    }

    @DeleteMapping("/{cvId}")
    ApiResponse<CVResponse> deleteCV(@PathVariable String cvId) {
        CVResponse deletedCV = cvService.deleteCV(cvId);
        return ApiResponse.<CVResponse>builder()
                .data(deletedCV)
                .message("CV deleted successfully")
                .build();
    }
}
