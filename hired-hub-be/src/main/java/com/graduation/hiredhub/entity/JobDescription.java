package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "job_description")
public class JobDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String requirement;

    @Column(nullable = false)
    private String benefit;

    @OneToMany(mappedBy = "jobDescription", cascade = CascadeType.ALL)
    private List<WorkAddress> workAddress;
}
