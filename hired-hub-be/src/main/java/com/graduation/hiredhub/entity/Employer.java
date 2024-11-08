package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employer")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employer extends User {
    @Column(length = 20)
    String position;

    @Column(length = 70)
    String companyName;

    @ManyToOne
    @JoinColumn(name = "company_id")
    Company company;
}
