package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserRequest userCreationRequest);

    UserResponse toUserResponse(User user);

    JobSeeker toJobSeeker(UserRequest userCreationRequest);

    Employer toEmployer(UserRequest userRequest);

    void updateUser(@MappingTarget User user, UserRequest userCreationRequest);
}
