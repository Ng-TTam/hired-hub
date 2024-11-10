package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "saved_post")
public class SavedPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @CreatedDate
    @Column(name = "saved_at")
    Instant savedAt;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    JobSeeker jobSeeker;

    @ManyToOne
    @JoinColumn(name = "posting_id", nullable = false)
    Posting posting;
}
