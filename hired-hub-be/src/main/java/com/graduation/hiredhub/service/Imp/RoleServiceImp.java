package com.graduation.hiredhub.service.Imp;

import com.graduation.hiredhub.dto.request.RoleRequest;
import com.graduation.hiredhub.dto.response.RoleResponse;
import com.graduation.hiredhub.entity.Role;
import com.graduation.hiredhub.mapper.RoleMapper;
import com.graduation.hiredhub.repository.PermissionRepository;
import com.graduation.hiredhub.repository.RoleRepository;
import com.graduation.hiredhub.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
public class RoleServiceImp implements RoleService {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RoleMapper roleMapper;
    @Autowired
    PermissionRepository permissionRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public RoleResponse create(RoleRequest roleRequest) {
        Role role = roleMapper.toRole(roleRequest);
        var permissions = permissionRepository.findAllById(roleRequest.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoleResponse> getAllRoles() {
        var roles = roleRepository.findAll();
        return roles.stream().map(roleMapper::toRoleResponse).toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
