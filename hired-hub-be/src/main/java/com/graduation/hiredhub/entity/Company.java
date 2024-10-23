package com.graduation.hiredhub.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(length = 25, nullable = false)
    String name;

    @Column(name = "tax_code", length = 20, nullable = false)
    String taxCode;

    Instant establishYear;

    String logo;

    @Column(length = 50, nullable = false)
    String address;

    String coverImage;

    String description;

    @CreatedDate
    @Column(name = "created_at")
    Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    Instant updatedAt;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @OneToOne
    @JoinColumn(name = "scale_category_id")
    ScaleCategory scaleCategory;
}
