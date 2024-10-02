package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.request.PermissionRequest;
import com.graduation.hiredhub.dto.response.PermissionResponse;
import com.graduation.hiredhub.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
public class PermissionController {
    @Autowired
    PermissionService permissionService;

    @PostMapping
    public ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest permissionRequest){
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.create(permissionRequest))
                .build();
    }

    @GetMapping
    public ApiResponse<List<PermissionResponse>> getAll(){
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @GetMapping("/{permission}")
    public ApiResponse<Void> delete(@PathVariable String permission){
        permissionService.deletePermission(permission);
        return ApiResponse.<Void>builder().build();
    }
}
