package com.graduation.hiredhub.service.Imp;

import com.graduation.hiredhub.dto.request.PermissionRequest;
import com.graduation.hiredhub.dto.response.PermissionResponse;
import com.graduation.hiredhub.entity.Permission;
import com.graduation.hiredhub.mapper.PermissionMapper;
import com.graduation.hiredhub.repository.PermissionRepository;
import com.graduation.hiredhub.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImp implements PermissionService {
    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionMapper permissionMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PermissionResponse create(PermissionRequest permissionRequest) {
        Permission permission = permissionRepository.save(permissionMapper.toPermission(permissionRequest));
        return permissionMapper.toPermissionResponse(permission);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePermission(String permission) {
        permissionRepository.deleteById(permission);
    }
}
