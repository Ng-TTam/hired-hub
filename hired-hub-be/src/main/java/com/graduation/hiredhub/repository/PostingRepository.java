package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.Posting;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PostingRepository extends JpaRepository<Posting, String>, JpaSpecificationExecutor<Posting> {
    Page<Posting> findByEmployer(Employer employer, Pageable pageable);
    List<Posting> findByEmployerId(String employerId);
}
