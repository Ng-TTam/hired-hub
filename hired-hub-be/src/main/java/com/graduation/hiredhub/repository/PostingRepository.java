package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.Posting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostingRepository extends JpaRepository<Posting, String> {

    Page<Posting> findByEmployer(Employer employer, Pageable pageable);
}
