package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.UserChangeInfoRequest;
import com.graduation.hiredhub.dto.request.UserChangePassRequest;
import com.graduation.hiredhub.dto.request.UserCreationRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse registerUser(UserCreationRequest userCreationRequest);
    void changeRewardPointUser(UserRequest userDTOCurrent, UserRequest userDTONew);
    UserResponse getInfo();
    List<UserResponse> getListUser();
    UserResponse changePassUser(UserChangePassRequest userChangePassRequest);
    UserResponse changeInfoUser(UserChangeInfoRequest userChangeInfoRequest);
    void deleteUser(int id);
    void deleteUser();
}
