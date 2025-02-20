package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.JobCategoryCreateRequest;
import com.graduation.hiredhub.dto.response.JobCategoryResponse;
import com.graduation.hiredhub.mapper.JobCategoryMapper;
import com.graduation.hiredhub.repository.JobCategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobCategoryService {
    JobCategoryRepository jobCategoryRepository;
    JobCategoryMapper jobCategoryMapper;

    public List<JobCategoryResponse> findAll() {
        return jobCategoryRepository.findAll().stream().map(jobCategoryMapper::toJobCategoryResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public JobCategoryResponse createJobCategory(JobCategoryCreateRequest jobCategoryCreateRequest) {
        return jobCategoryMapper.toJobCategoryResponse(
                jobCategoryRepository.save(
                        jobCategoryMapper.toJobCategory(jobCategoryCreateRequest)
                )
        );
    }
}
