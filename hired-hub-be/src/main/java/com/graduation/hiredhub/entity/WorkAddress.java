package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "work_address")
public class WorkAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(length = 50)
    String location;

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    Province province;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    District district;

    @ManyToOne
    @JoinColumn(name = "job_description_id", nullable = false)
    JobDescription jobDescription;
}
