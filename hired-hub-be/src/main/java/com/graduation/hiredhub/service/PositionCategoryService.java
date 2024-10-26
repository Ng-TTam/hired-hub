package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.response.PositionCategoryResponse;
import com.graduation.hiredhub.mapper.PositionCategoryMapper;
import com.graduation.hiredhub.repository.PositionCategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PositionCategoryService {
    PositionCategoryRepository positionCategoryRepository;
    PositionCategoryMapper positionCategoryMapper;

    public List<PositionCategoryResponse> findAll() {
        return positionCategoryRepository.findAll().stream().map(positionCategoryMapper::toPositionCategoryResponse).toList();
    }
}
