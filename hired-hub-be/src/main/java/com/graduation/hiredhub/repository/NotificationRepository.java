package com.graduation.hiredhub.repository;

import com.graduation.hiredhub.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    Page<Notification> findAllByUserAccountIdOrderByCreatedAtDesc(String accountId, Pageable pageable);

    Optional<Notification> findByIdAndUserAccountId(String id, String accountId);

    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.user.account.id = ?1")
    void markAsReadAll(String accountId);

    @Query("SELECT COUNT(n.id) FROM Notification n WHERE n.user.account.id = ?1 AND n.isRead = false")
    int countUnreadNotification(String accountId);
}
