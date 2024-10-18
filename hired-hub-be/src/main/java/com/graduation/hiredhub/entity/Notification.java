package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.NotificationType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    private String id;

    @Column(length = 100, nullable = false)
    private String title;

    private String content;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    private String referenceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
