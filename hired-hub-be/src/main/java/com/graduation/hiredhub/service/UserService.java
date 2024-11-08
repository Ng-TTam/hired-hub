package com.graduation.hiredhub.service;

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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    MinioService minioService;

    static final String FOLDER_UPLOAD_AVATAR = "avatars";


    /**
     * Update profile of user is verified (status = "ACTIVATE")
     *
     * @param userRequest request user field to update
     * @return profile user
     */
    @Transactional
    @PreAuthorize("hasRole('JOB_SEEKER') or hasRole('EMPLOYER')")
    public UserResponse updateUserProfile(UserRequest userRequest){
        User user = getUserInContext();
        if(user.getAccount().getStatus() == Status.PENDING)
            throw new AppException(ErrorCode.ACCOUNT_NOT_VERIFY);

        userMapper.updateUser(user, userRequest);

        if( userRequest.getAvatar() != null)
            user.setAvatar(minioService.uploadFile(userRequest.getAvatar(), FOLDER_UPLOAD_AVATAR));

        try {
            userRepository.save(user);
        }  catch (Exception e) {
            log.error(e.getMessage());
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