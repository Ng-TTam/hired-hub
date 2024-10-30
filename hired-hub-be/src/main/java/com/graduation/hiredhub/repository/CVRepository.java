package com.graduation.hiredhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.JobSeeker;

public interface CVRepository extends JpaRepository<CV, String> {
    List<CV> findByJobSeeker(JobSeeker jobSeeker);

}
