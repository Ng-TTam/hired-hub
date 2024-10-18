package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "work_address")
public class WorkAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    private String id;

    @Column(length = 50)
    private String location;

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @ManyToOne
    @JoinColumn(name = "job_description_id", nullable = false)
    private JobDescription jobDescription;
}
