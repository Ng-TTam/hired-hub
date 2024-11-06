package com.graduation.hiredhub.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.request.ApplicationRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.service.ApplicationService;
import com.graduation.hiredhub.service.PostingService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationController {
        ApplicationService applicationService;

        @GetMapping("applications/{applicationId}")
        ApiResponse<ApplicationResponse> getApplicationJobSeeker(@PathVariable Integer applicationId){
                return ApiResponse.<ApplicationResponse>builder()
                        .data(applicationService.getApplicationByJobSeeker(applicationId))
                        .message("Successfully")
                        .build();
        }

        @GetMapping("applications/posting/{postingId}")
        ApiResponse<ApplicationResponse> getApplicationJobSeeker(@PathVariable String postingId){
                return ApiResponse.<ApplicationResponse>builder()
                        .data(applicationService.getApplicationByJobSeekerInPosting(postingId))
                        .message("Successfully")
                        .build();
        }

        @PostMapping("applications/{postingId}/{cvId}")
        ApiResponse<ApplicationResponse> createApplication( @RequestBody @Valid ApplicationRequest applicationRequest,
                                                        @PathVariable String postingId,
                                                        @PathVariable String cvId){
                return ApiResponse.<ApplicationResponse>builder()
                        .data(applicationService.createApplication(applicationRequest, postingId, cvId))
                        .message("Successfully")
                        .build();
        }


        @DeleteMapping("applications/{applicationId}")
        ApiResponse<ApplicationResponse> deleteApplication(@PathVariable Integer applicationId){
                return ApiResponse.<ApplicationResponse>builder()
                        .data(applicationService.deleteApplication(applicationId))
                        .message("Successfully")
                        .build();
        }

        @GetMapping("posting/{postingId}/applications")
        ApiResponse<PageResponse<ApplicationDTO>> getApplicationsByPosting(
                @PathVariable String postingId,
                @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
                return ApiResponse.<PageResponse<ApplicationDTO>>builder()
                        .data(applicationService.getApplicationsByEmployer(postingId, page, size))
                        .build();
        }

        @GetMapping("posting/{postingId}/applications/{applicationId}")
        ApiResponse<ApplicationDTO> getApplicationByPosting(@PathVariable String postingId,
                                                                @PathVariable Integer applicationId) {
                return ApiResponse.<ApplicationDTO>builder()
                        .data(applicationService.getApplicationByEmployer(postingId, applicationId))
                        .build();
        }

        @PutMapping("posting/{postingId}/applications/{applicationId}")
        ApiResponse<ApplicationDTO> responseApplicationInPosting(@PathVariable String postingId,
                                                                @PathVariable Integer applicationId,
                                                                @RequestBody @Valid ApplicationDTO applicationDTO) {
                return ApiResponse.<ApplicationDTO>builder()
                        .data(applicationService.updateApplication(postingId, applicationId, applicationDTO))
                        .build();
        }

        @GetMapping("jobSeeker/applications")
        ApiResponse<List<ApplicationResponse>> getApplicationsByJobSeeker(){
                List<ApplicationResponse> applications = applicationService.getApplicationsByJobSeeker();
                return ApiResponse.<List<ApplicationResponse>>builder()
                        .data(applications)
                        .build();
        }

}
