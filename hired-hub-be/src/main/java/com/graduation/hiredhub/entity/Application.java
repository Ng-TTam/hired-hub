package com.graduation.hiredhub.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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

    @Lob
    @Column(columnDefinition = "json")
    String cvSend;

    @ManyToOne
    @JoinColumn(name = "cv_id", nullable = false)
    CV cv;

    @ManyToOne
    @JoinColumn(name = "posting_id", nullable = false)
    Posting posting;

    @CreatedDate
    @Column(name = "created_at")
    Instant createdAt;

    @LastModifiedDate
    Instant updatedAt;
}
