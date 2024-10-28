package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.CurrencyUnit;
import com.graduation.hiredhub.entity.enumeration.ExperienceRequire;
import com.graduation.hiredhub.entity.enumeration.Gender;
import com.graduation.hiredhub.entity.enumeration.JobType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
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

    @Column(length = 100, nullable = false)
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

    @Column(name = "expired_at")
    Instant expiredAt;

    @OneToMany(mappedBy = "posting", cascade = CascadeType.ALL)
    List<Application> applications;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_description_id", nullable = false)
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

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    Employer employer;
}
