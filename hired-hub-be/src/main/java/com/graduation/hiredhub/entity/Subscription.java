package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @CreatedDate
    @Column(name = "subscribe_at")
    Instant subscribeAt;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    Company company;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    JobSeeker jobSeeker;
}
