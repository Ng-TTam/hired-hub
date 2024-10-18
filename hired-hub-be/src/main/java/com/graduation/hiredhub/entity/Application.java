package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    private String message;

    @ManyToOne
    @JoinColumn(name = "cv_id", nullable = false)
    private CV cv;

    @ManyToOne
    @JoinColumn(name = "posting_id", nullable = false)
    private Posting posting;

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;
}
