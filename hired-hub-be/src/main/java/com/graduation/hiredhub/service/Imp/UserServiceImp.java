package com.graduation.hiredhub.service.Imp;

import com.graduation.hiredhub.constrant.PredefinedRole;
import com.graduation.hiredhub.dto.request.UserChangeInfoRequest;
import com.graduation.hiredhub.dto.request.UserChangePassRequest;
import com.graduation.hiredhub.dto.request.UserCreationRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.Role;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.UserMapper;
import com.graduation.hiredhub.repository.RoleRepository;
import com.graduation.hiredhub.repository.UserRepository;
import com.graduation.hiredhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserMapper userMapper;
    @Autowired
    RoleRepository roleRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(7);

    @Override
    @Transactional
    public UserResponse registerUser(UserCreationRequest userCreationRequest){
        User user = userMapper.toUser(userCreationRequest);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception){
            throw new AppException(ErrorCode.NAME_LOGIN_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional
//    @PreAuthorize("hasAuthority('CHANGE_PASS')")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public UserResponse changePassUser(UserChangePassRequest userChangePassRequest) {
        User user = getUserInContext();

        if(!userChangePassRequest.getCurrentPassword().equals(user.getPassword()))
            throw new AppException(ErrorCode.WRONG_CURRENT_PASS);

        user.setPassword(userChangePassRequest.getNewPassword());

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public UserResponse changeInfoUser(UserChangeInfoRequest userChangeInfoRequest) {
        User user = getUserInContext();
        userMapper.updateInfoUser(user, userChangeInfoRequest);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasRole('USER')")
    public void deleteUser() {
        userRepository.delete(getUserInContext());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public void changeRewardPointUser(UserRequest userDTOCurrent, UserRequest userDTONew) {
        User user = getUserInContext();
        user.setRewardPoint(userDTONew.getRewardPoint());//using for exchange discount
        userRepository.save(user);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public UserResponse getInfo() {
        return userMapper.toUserResponse(getUserInContext());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getListUser() {
        var users = userRepository.findAll();
        return users.stream().map(userMapper::toUserResponse).toList();
    }

    public User getUserInContext(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        return userRepository.findByNameLogin(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
