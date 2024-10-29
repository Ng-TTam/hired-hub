package com.graduation.hiredhub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.JobSeeker;

public interface CVRepository extends JpaRepository<CV, String> {
    Optional<CV> findByJobSeeker(JobSeeker jobSeeker);    

}
