package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "job_description")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(columnDefinition = "TEXT")
    String requirement;

    @Column(columnDefinition = "TEXT")    
    String benefit;

    @OneToMany(mappedBy = "jobDescription")
    List<WorkAddress> workAddress;
}
