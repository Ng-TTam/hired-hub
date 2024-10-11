package com.graduation.hiredhub.entity;

import com.graduation.hiredhub.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@Table(name = "user")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String nameAccount;

    @Column(unique = true)
    String username;
    String password;

    String email;
    String number;
    LocalDate birth;
    String address;

    String gender;

    Role role;
}
