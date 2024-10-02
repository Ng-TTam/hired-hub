package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.UserChangeInfoRequest;
import com.graduation.hiredhub.dto.request.UserCreationRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest userCreationRequest);

    User toUser(UserRequest userRequest);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserRequest userRequest);

    void updateInfoUser(@MappingTarget User user, UserChangeInfoRequest userChangeInfoRequest);
}
