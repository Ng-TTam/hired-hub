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

    @Lob
    String description;

    @Lob
    String requirement;

    @Lob
    String benefit;

    @OneToMany(mappedBy = "jobDescription", cascade = CascadeType.ALL)
    List<WorkAddress> workAddress;
}
