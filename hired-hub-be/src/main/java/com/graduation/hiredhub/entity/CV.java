package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cv")
public class CV {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    private String id;

    private String description;

    @Column(nullable = false)
    private String experience;

    @Column(nullable = false)
    private String education;

    @Column(nullable = false)
    private String skill;

    private String others;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    private JobSeeker jobSeeker;
}
