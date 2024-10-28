package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    Page<Application> findByPostingId(String postingId, Pageable pageable);
}
