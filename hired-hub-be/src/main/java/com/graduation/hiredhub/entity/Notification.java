package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.NotificationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
