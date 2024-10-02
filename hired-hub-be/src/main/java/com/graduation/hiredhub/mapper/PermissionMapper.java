package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.PermissionRequest;
import com.graduation.hiredhub.dto.response.PermissionResponse;
import com.graduation.hiredhub.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest permissionRequest);

    PermissionResponse toPermissionResponse(Permission permission);
}
