package com.graduation.hiredhub.configuration;

import com.graduation.hiredhub.entity.Account;
import com.graduation.hiredhub.entity.District;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.Province;
import com.graduation.hiredhub.entity.enumeration.Gender;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.repository.AccountRepository;
import com.graduation.hiredhub.repository.DistrictRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.ProvinceRepository;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Configuration
public class AppInitConfig {
    private static final Logger log = LoggerFactory.getLogger(AppInitConfig.class);

    @NonFinal
    static String ADMIN_EMAIL_LOGIN = "admin@email.com";
    @NonFinal
    static String ADMIN_PASSWORD = "admin";

    private static final String JOB_SEEKER_EMAIL = "job_seeker";
    private static final String JOB_SEEKER_PASSWORD = "job_seeker";

    @Autowired
    PasswordEncoder passwordEncoder;

    private final ProvinceRepository provinceRepository;

    private final AccountRepository accountRepository;

    private final DistrictRepository districtRepository;

    public AppInitConfig(ProvinceRepository provinceRepository,
                         AccountRepository accountRepository,
                         DistrictRepository districtRepository) {
        this.provinceRepository = provinceRepository;
        this.accountRepository = accountRepository;
        this.districtRepository = districtRepository;
    }

    @Bean
//    @ConditionalOnProperty(
//            prefix = "spring",
//            value = "datasource.driverClassName",
//            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner() {
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

            if (provinceRepository.findAll().isEmpty()) {
                initProvincesAndDistricts();
            }
        };
    }

    /**
     * This method to auto init Province and District to store in DB
     */
    public void initProvincesAndDistricts() {
        RestTemplate restTemplate = new RestTemplate();
        if (provinceRepository.count() == 0) {
            log.info("Running init Provinces and Districts");

            String API_URL = "https://provinces.open-api.vn/api/?depth=2";
            List<Map<String, Object>> provinces = restTemplate.getForObject(API_URL, List.class);

            if (provinces != null) {
                for (Map<String, Object> provinceData : provinces) {
                    String provinceName = (String) provinceData.get("name");
                    Province province = Province.builder()
                            .name(provinceName)
                            .build();
                    province = provinceRepository.save(province);

                    List<Map<String, Object>> districts = (List<Map<String, Object>>) provinceData.get("districts");
                    if (districts != null) {
                        for (Map<String, Object> districtData : districts) {
                            String districtName = (String) districtData.get("name");
                            District district = District.builder()
                                    .name(districtName)
                                    .province(province)
                                    .build();
                            districtRepository.save(district);
                        }
                    }
                }
                log.info("Init Provinces and District successfully");
            }
        }
    }
}
