package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.CurrencyUnit;
import com.graduation.hiredhub.entity.enumeration.JobType;
import jakarta.persistence.*;
import lombok.*;
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
public class Posting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    private String id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer experienceYear;

    private String gender;

    @Column(name = "number_of_position", nullable = false)
    private Integer numberOfPosition;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    private JobType jobType;

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "expired_at")
    private Instant expiredAt;

    @OneToMany(mappedBy = "posting", cascade = CascadeType.ALL)
    private List<Application> applications;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_description_id", nullable = false)
    private JobDescription jobDescription;

    @ManyToOne
    @JoinColumn(name = "main_job_id", nullable = false)
    private JobCategory mainJob;

    @ManyToMany
    private List<JobCategory> subJobs;

    @ManyToOne
    @JoinColumn(name = "position_id", nullable = false)
    private PositionCategory position;

    private CurrencyUnit currencyUnit;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;
}
