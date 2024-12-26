package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.entity.enumeration.Gender;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 40)
    String id;

    @Column(name = "first_name", length = 20, nullable = false)
    String firstName;

    @Column(name = "last_name", length = 20, nullable = false)
    String lastName;

    @Column(nullable = false)
    LocalDate dob;

    @Column(length = 50, nullable = false)
    String address;

    @Column(name = "phone_number", length = 13, nullable = false)
    String phoneNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Gender gender;

    String avatar;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "account_id")
    Account account;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Notification> notifications;

    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "json")
    private String preferences;
}
