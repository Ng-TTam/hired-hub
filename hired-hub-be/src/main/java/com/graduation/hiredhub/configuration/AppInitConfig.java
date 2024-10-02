package com.graduation.hiredhub.configuration;

import com.graduation.hiredhub.constrant.PredefinedRole;
import com.graduation.hiredhub.entity.Role;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.repository.UserRepository;
import com.graduation.hiredhub.repository.RoleRepository;
import lombok.experimental.NonFinal;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
public class AppInitConfig {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(7);

    @NonFinal
    static String ADMIN_USER_LOGIN = "admin";
    @NonFinal
    static String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository){
        return args -> {
            if(userRepository.findByNameLogin(ADMIN_USER_LOGIN).isEmpty()){
                //add user role
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());

                //add admin role
                Role adminRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());

                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .nameLogin(ADMIN_USER_LOGIN)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .build();

                userRepository.save(user);
            }
        };
    }
}
