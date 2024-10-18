package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    private String id;

    @Column(length = 25, nullable = false)
    private String name;

    @Column(name = "tax_code", length = 20, nullable = false)
    private String taxCode;

    private Instant establishYear;

    private String logo;

    @Column(length = 50, nullable = false)
    private String address;

    private String coverImage;

    private String description;

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @OneToOne
    @JoinColumn(name = "scale_category_id")
    private ScaleCategory scaleCategory;
}
