package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.EmployerResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toUserResponse(User user);

    @Mapping(target = "avatar", ignore = true)
    JobSeeker toJobSeeker(UserRequest userCreationRequest);

    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "position", ignore = true)
    Employer toEmployer(UserRequest userRequest);

    @Mapping(target = "company", source = "company")
    EmployerResponse toEmployerResponse(Employer employer);

    @Mapping(target = "avatar", ignore = true)
    void updateUser(@MappingTarget User user, UserRequest userCreationRequest);
}
