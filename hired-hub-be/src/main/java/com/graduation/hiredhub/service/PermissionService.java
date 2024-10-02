package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.PermissionRequest;
import com.graduation.hiredhub.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionService {
    PermissionResponse create(PermissionRequest permissionRequest);
    List<PermissionResponse> getAll();
    void deletePermission(String permission);
}
