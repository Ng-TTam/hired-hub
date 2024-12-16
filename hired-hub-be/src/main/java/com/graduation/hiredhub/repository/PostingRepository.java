package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface PostingRepository extends JpaRepository<Posting, String>, JpaSpecificationExecutor<Posting> {

    @Query("SELECT p FROM Posting p WHERE p.expiredAt <= CURRENT_TIMESTAMP AND p.status <> 'DEACTIVATE'")
    List<Posting> findExpiredPosts();

    @Query("SELECT p FROM Posting p WHERE p.expiredAt BETWEEN :currentDate AND :futureDate AND p.status = 'ACTIVATE'")
    List<Posting> findExpiringPostsWithinDays(@Param("currentDate") Instant currentDate,
                                           @Param("futureDate") Instant futureDate);

    Page<Posting> findByStatus(PostingStatus status, Pageable pageable);

    List<Posting> findByStatus(PostingStatus status, Sort sort);

    List<Posting> findByEmployerId(String employerId);
}
