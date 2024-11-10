package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByAccountId(String accountId);
    Page<User> findByAccountStatus(Status status, Pageable pageable);
}
