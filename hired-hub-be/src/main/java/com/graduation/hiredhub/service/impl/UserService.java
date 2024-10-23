package com.graduation.hiredhub.service.impl;

import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.UserMapper;
import com.graduation.hiredhub.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    @Transactional
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public UserResponse updateUserProfile(UserRequest userCreationRequest){
        User user = getUserInContext();
        userMapper.updateUser(user, userCreationRequest);

        if(user.getAccount().getStatus() == Status.PENDING)
            throw new AppException(ErrorCode.ACCOUNT_NOT_VERIFY);

        try {
            userRepository.save(user);
        }  catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUser(){
        return userMapper.toUserResponse(getUserInContext());
    }

    private User getUserInContext() {
        var context = SecurityContextHolder.getContext();
        var accountId = context.getAuthentication().getName();

        return userRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}