package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_seeker")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobSeeker extends User {
    @OneToMany(mappedBy = "jobSeeker")
    List<CV> cvs;

    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
    List<SavedPost> savedPosts;
}
