package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_seeker")
public class JobSeeker extends User {
    @OneToMany(mappedBy = "jobSeeker")
    private List<CV> cvs;

    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
    private List<SavedPost> savedPosts;
}
