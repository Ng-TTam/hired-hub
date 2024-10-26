package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.entity.Province;
import com.graduation.hiredhub.service.ProvinceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("province")
public class ProvinceController {

    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    /**
     * {@code GET /province} get all provinces
     *
     * @return the {@link ApiResponse} with list of {@link Province} in data
     */
    @GetMapping
    public ApiResponse<List<Province>> getAllProvinces() {
        return ApiResponse.<List<Province>>builder()
                .data(provinceService.findAll())
                .build();
    }
}
