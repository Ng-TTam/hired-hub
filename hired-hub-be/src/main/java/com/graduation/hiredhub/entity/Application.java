package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
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
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ApplicationStatus status;

    String message;

    @ManyToOne
    @JoinColumn(name = "cv_id", nullable = false)
    CV cv;

    @ManyToOne
    @JoinColumn(name = "posting_id", nullable = false)
    Posting posting;

    @CreatedDate
    @Column(name = "created_at")
    Instant createdAt;
}
