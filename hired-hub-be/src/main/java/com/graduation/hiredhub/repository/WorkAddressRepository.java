package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.WorkAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkAddressRepository extends JpaRepository<WorkAddress, String> {
}
