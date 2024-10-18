package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employer")
public class Employer extends User {
    @Column(length = 20)
    private String position;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
