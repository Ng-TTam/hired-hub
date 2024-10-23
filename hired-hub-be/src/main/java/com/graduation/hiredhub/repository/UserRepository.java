package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByAccountId(String accountId);
}
