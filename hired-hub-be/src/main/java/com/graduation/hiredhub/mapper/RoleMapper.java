package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.RoleRequest;
import com.graduation.hiredhub.dto.response.RoleResponse;
import com.graduation.hiredhub.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
