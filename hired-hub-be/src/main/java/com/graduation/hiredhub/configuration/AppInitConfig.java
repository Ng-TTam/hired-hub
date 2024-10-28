package com.graduation.hiredhub.configuration;

import com.graduation.hiredhub.entity.Account;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppInitConfig {
    @NonFinal
    static String ADMIN_EMAIL_LOGIN = "admin@email.com";
    @NonFinal
    static String ADMIN_PASSWORD = "admin";
    PasswordEncoder passwordEncoder;

    @Bean
//    @ConditionalOnProperty(
//            prefix = "spring",
//            value = "datasource.driverClassName",
//            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(AccountRepository accountRepository) {
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
//             accountRepository.findAll().forEach(account -> {
//                 account.setPassword(passwordEncoder.encode("password"));
//                 accountRepository.save(account);
//             });
        };
    }
}
