package com.graduation.hiredhub.entity;

import java.time.Instant;

import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "cv")
public class CV {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(length = 150, nullable = false)
    String name;

    @Lob
    String description;

    @Lob
    @Column(nullable = false)
    String experience;

    @Lob
    @Column(nullable = false)
    String education;

    @Lob
    @Column(nullable = false)
    String skill;

    @Lob
    String others;

    @LastModifiedDate
    Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    JobSeeker jobSeeker;
}
