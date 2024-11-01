package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import com.graduation.hiredhub.dto.request.CVRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.CVResponse;
import com.graduation.hiredhub.service.CVService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;


@RestController
@RequestMapping("/cv")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CVController {
    CVService cvService;
    ApplicationService applicationService;

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

    @GetMapping("/{cvId}")
    ApiResponse<CVResponse>getCV(@PathVariable String cvId){
        CVResponse cv = cvService.getCV(cvId);
        return ApiResponse.<CVResponse>builder()
                .data(cv)
                .message("Successfully")
                .build();
    }

    @GetMapping("/{cvId}/applications")
    ApiResponse<List<ApplicationResponse>> getApplications(@PathVariable String cvId){
        List<ApplicationResponse> applications = applicationService.getApplicationByCVId(cvId);
        return ApiResponse.<List<ApplicationResponse>>builder()
                .data(applications)
                .message("Successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<List<CVResponse>> getAllCVs() {
        List<CVResponse> cvs = cvService.getAllCVs();
        return ApiResponse.<List<CVResponse>>builder()
                .data(cvs)
                .message("Successfully retrieved all CVs")
                .build();
    }
}
