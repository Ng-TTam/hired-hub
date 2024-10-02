package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.RoleRequest;
import com.graduation.hiredhub.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    RoleResponse create(RoleRequest roleRequest);
    List<RoleResponse> getAllRoles();
    void delete(String role);

}
