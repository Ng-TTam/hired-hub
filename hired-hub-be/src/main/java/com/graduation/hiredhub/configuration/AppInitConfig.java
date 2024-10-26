package com.graduation.hiredhub.configuration;

import com.graduation.hiredhub.entity.Account;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.enumeration.Gender;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.repository.AccountRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.time.LocalDate;

@Configuration
public class AppInitConfig {
    @NonFinal
    static String ADMIN_EMAIL_LOGIN = "admin@email.com";
    @NonFinal
    static String ADMIN_PASSWORD = "admin";

    private static final String JOB_SEEKER_EMAIL = "job_seeker";
    private static final String JOB_SEEKER_PASSWORD = "job_seeker";

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
//    @ConditionalOnProperty(
//            prefix = "spring",
//            value = "datasource.driverClassName",
//            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(AccountRepository accountRepository,
                                        JobSeekerRepository jobSeekerRepository) {
        return args -> {
            if (accountRepository.findByEmail(ADMIN_EMAIL_LOGIN).isEmpty()) {

                Account account = Account.builder()
                        .email(ADMIN_EMAIL_LOGIN)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(Role.ADMIN)
                        .status(Status.ACTIVATE)
                        .build();

                accountRepository.save(account);
            }
        };
    }
}
