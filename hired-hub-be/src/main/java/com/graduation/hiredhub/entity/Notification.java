package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.NotificationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(length = 100, nullable = false)
    String title;

    String content;

    @Column(name = "is_read", nullable = false)
    Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationType type;

    String referenceId;

    @CreatedDate
    @Column(name = "created_at")
    Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
