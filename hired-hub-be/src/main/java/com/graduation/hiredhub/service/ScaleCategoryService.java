package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.response.ScaleCategoryResponse;
import com.graduation.hiredhub.mapper.ScaleCategoryMapper;
import com.graduation.hiredhub.repository.ScaleCategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScaleCategoryService {
    ScaleCategoryRepository scaleCategoryRepository;
    ScaleCategoryMapper scaleCategoryMapper;

    public List<ScaleCategoryResponse> findAll() {
        return scaleCategoryRepository.findAll().stream()
                .map(scaleCategoryMapper::scaleCategoryResponse)
                .toList();
    }
}
