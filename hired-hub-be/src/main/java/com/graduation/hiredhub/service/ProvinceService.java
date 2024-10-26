package com.graduation.hiredhub.service;

import com.graduation.hiredhub.entity.Province;
import com.graduation.hiredhub.repository.ProvinceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceService {
    private final ProvinceRepository provinceRepository;

    public ProvinceService(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    public List<Province> findAll() {
        return provinceRepository.findAll();
    }
}
