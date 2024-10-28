package com.graduation.hiredhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graduation.hiredhub.entity.CV;

public interface CVRepository extends JpaRepository<CV, String> {

    
}
