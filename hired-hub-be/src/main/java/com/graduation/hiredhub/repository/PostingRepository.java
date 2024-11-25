package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PostingRepository extends JpaRepository<Posting, String>, JpaSpecificationExecutor<Posting> {
    Page<Posting> findByEmployer(Employer employer, Pageable pageable);

    List<Posting> findByStatus(PostingStatus status);

    List<Posting> findByEmployerId(String employerId);
}
