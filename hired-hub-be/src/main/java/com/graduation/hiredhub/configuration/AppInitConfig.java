package com.graduation.hiredhub.configuration;

import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.enums.Role;
import com.graduation.hiredhub.repository.UserRepository;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class AppInitConfig {
    @Autowired
    PasswordEncoder passwordEncoder;

    @NonFinal
    static String ADMIN_USER_LOGIN = "admin";
    @NonFinal
    static String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByUsername(ADMIN_USER_LOGIN).isEmpty()){

                User user = User.builder()
                        .username(ADMIN_USER_LOGIN)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(user);
            }
        };
    }
}
