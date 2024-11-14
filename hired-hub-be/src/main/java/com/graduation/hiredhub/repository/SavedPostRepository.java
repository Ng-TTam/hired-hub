package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.SavedPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {
    Page<SavedPost> findAllByJobSeekerId(String jobSeekerId, Pageable pageable);

    Optional<SavedPost> findByJobSeekerIdAndPostingId(String jobSeekerId, String postingId);

    boolean existsByJobSeekerIdAndPostingId(String jobSeekerId, String postingId);

    void deleteByJobSeekerIdAndPostingId(String jobSeekerId, String postingId);
}
