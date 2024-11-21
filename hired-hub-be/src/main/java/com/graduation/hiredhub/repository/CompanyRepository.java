package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String>, JpaSpecificationExecutor<Company> {
    Page<Company> findAllByNameContainsAndIsActiveTrue(String name, Pageable pageable);

    Page<Company> findAllByIsActiveTrue(Pageable pageable);
}
