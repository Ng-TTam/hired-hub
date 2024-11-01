package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobCategoryRepository extends JpaRepository<JobCategory, Integer> {
}
