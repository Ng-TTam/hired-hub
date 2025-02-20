package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.*;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "posting")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Posting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ExperienceRequire experienceRequire;

    @Enumerated(EnumType.STRING)
    Gender genderRequire;

    @Column(name = "number_of_position", nullable = false)
    Integer numberOfPosition;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    JobType jobType;

    @CreatedDate
    @Column(name = "created_at")
    Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    Instant updatedAt;

    @Column(name = "expired_at")
    Instant expiredAt;

    @OneToMany(mappedBy = "posting", cascade = CascadeType.ALL)
    List<Application> applications;

    @OneToOne
    @JoinColumn(name = "job_description_id")
    JobDescription jobDescription;

    @ManyToOne
    @JoinColumn(name = "main_job_id", nullable = false)
    JobCategory mainJob;

    @ManyToMany
    List<JobCategory> subJobs;

    @ManyToOne
    @JoinColumn(name = "position_id", nullable = false)
    PositionCategory position;

    CurrencyUnit currencyUnit;

    Integer minimumSalary;

    Integer maximumSalary;

    @Enumerated(EnumType.STRING)
    PostingStatus status;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    Employer employer;
}
