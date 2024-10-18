package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "scale_category")
public class ScaleCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(name = "min_employee")
    private Integer minEmployee;

    @Column(name = "max_employee")
    private Integer maxEmployee;
}
