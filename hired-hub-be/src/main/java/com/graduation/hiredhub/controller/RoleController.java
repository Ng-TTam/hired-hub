package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.request.RoleRequest;
import com.graduation.hiredhub.dto.response.RoleResponse;
import com.graduation.hiredhub.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    RoleService roleService;

    @PostMapping
    @PreAuthorize("hasAuthorize('APPROVE_ROLE')")
    public ApiResponse<RoleResponse> create(@RequestBody RoleRequest roleRequest){
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(roleRequest))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasAuthorize('APPROVE_ROLE')")
    ApiResponse<List<RoleResponse>> getAll(){
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAllRoles())
                .build();
    }

    @DeleteMapping("/{role}")
    @PreAuthorize("hasAuthorize('APPROVE_ROLE')")
    ApiResponse<Void> delete(@PathVariable String role){
        roleService.delete(role);
        return ApiResponse.<Void>builder().build();
    }
}
