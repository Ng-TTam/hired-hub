package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, String> {
    Integer countByCompanyId(String companyId);
    Boolean existsByJobSeekerIdAndCompanyId(String jobSeekerId, String companyId);
    void deleteByJobSeekerIdAndCompanyId(String jobSeekerId, String companyId);
}
