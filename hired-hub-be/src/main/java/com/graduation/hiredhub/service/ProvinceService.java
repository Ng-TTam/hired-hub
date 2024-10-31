package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.ProvinceDetailDTO;
import com.graduation.hiredhub.mapper.ProvinceMapper;
import com.graduation.hiredhub.repository.ProvinceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProvinceService {
    ProvinceRepository provinceRepository;
    ProvinceMapper provinceMapper;

    public List<ProvinceDetailDTO> findAll() {
        return provinceRepository.findAll().stream().map(provinceMapper::toProvinceDetailDTO).toList();
    }
}
