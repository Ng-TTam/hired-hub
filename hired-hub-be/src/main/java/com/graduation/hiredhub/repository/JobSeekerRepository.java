package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.JobSeeker;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, String> {
    Optional<JobSeeker> findByAccountEmail(String email);

    Optional<JobSeeker> findByAccountId(String accountId);

    // List<CV> findCVByJobSeeker(JobSeeker jobSeeker);

    // Optional<CV> findByJobSeeker(JobSeeker jobSeeker);
}
