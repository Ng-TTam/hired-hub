package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.reqResp.ProvinceDetailDTO;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingResponse;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.ProvinceMapper;
import com.graduation.hiredhub.repository.ProvinceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProvinceService {
    ProvinceRepository provinceRepository;
    ProvinceMapper provinceMapper;
    StringRedisTemplate stringRedisTemplate;
    ObjectMapper objectMapper;

    private static final String REDIS_PROVINCE_KEY = "provinces";
    private static final int REDIS_PROVINCE_TTL_HOURS = 18;

    public List<ProvinceDetailDTO> findAll() {
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(REDIS_PROVINCE_KEY))) {
            try {
                return objectMapper.readValue(stringRedisTemplate.opsForValue().get(REDIS_PROVINCE_KEY),
                        new TypeReference<List<ProvinceDetailDTO>>() {
                        });
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_PARSING_JSON);
            }
        } else {
            try {
                List<ProvinceDetailDTO> provinces = provinceRepository.findAll()
                        .stream()
                        .map(provinceMapper::toProvinceDetailDTO)
                        .toList();
                String jsonResponse = objectMapper.writeValueAsString(provinces);
                stringRedisTemplate.opsForValue().set(REDIS_PROVINCE_KEY, jsonResponse, REDIS_PROVINCE_TTL_HOURS, TimeUnit.HOURS);
                return provinces;
            } catch (Exception e) {
                throw new AppException(ErrorCode.ERROR_SERIALIZING_JSON);
            }
        }
    }
}
