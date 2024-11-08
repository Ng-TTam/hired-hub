package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, String> {
}