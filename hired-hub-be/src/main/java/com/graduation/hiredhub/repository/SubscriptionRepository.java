package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, String> {
    Integer countByCompanyId(String companyId);

    Boolean existsByJobSeekerIdAndCompanyId(String jobSeekerId, String companyId);

    void deleteByJobSeekerIdAndCompanyId(String jobSeekerId, String companyId);

    List<Subscription> findAllByCompanyId(String id);
}
