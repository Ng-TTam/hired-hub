package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Application;
import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.Posting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    Page<Application> findByPostingId(String postingId, Pageable pageable);

    List<Application> findByCv(CV cv);

    Optional<Application> findByPostingAndCv(Posting postingId, CV cv);

    List<Application> findByPosting(Posting posting);
}
