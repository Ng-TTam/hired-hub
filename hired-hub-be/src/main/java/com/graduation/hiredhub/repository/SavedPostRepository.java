package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {
    Optional<SavedPost> findByPostingId(String postingId);
}
