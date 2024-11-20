package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.EmployerCompanyUpdateRequest;
import com.graduation.hiredhub.dto.request.UserRequest;
import com.graduation.hiredhub.dto.response.EmployerResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.UserResponse;
import com.graduation.hiredhub.entity.Company;
import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.UserMapper;
import com.graduation.hiredhub.repository.CompanyRepository;
import com.graduation.hiredhub.repository.EmployerRepository;
import com.graduation.hiredhub.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    private final CompanyRepository companyRepository;
    UserRepository userRepository;
    UserMapper userMapper;
    MinioService minioService;

    static final String FOLDER_UPLOAD_AVATAR = "avatars";
    private final EmployerRepository employerRepository;

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

    /**
     * Only ADMIN can get all users have account are pending
     *
     * @param page:current page stay in
     * @param size:length of page
     * @return page of user
     */
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<UserResponse> getUsersPending(int page, int size){
        Pageable pageable = PageRequest.of(page - 1,size);
        var pageData = userRepository.findByAccountStatus(Status.PENDING, pageable);
        return PageResponse.<UserResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(userMapper::toUserResponse).toList())
                .build();
    }

    /**
     * Only ADMIN can approve user PENDING -> ACTIVATE
     *
     * @param userId :id of user (employer)
     * @return user after approve
     */
    @PreAuthorize("hasRole('ADMIN')")
    public EmployerResponse approveEmployer(String userId){
        Employer employer = employerRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.INTERNAL_ERROR)
        );

        if(employer.getAccount().getStatus() != Status.PENDING)
            throw new AppException(ErrorCode.USER_NOT_PENDING);

        employer.getAccount().setStatus(Status.ACTIVATE);
        employer.getCompany().setIsActive(true);
        return userMapper.toEmployerResponse(employerRepository.save(employer));
    }

    private User getUserInContext() {
        var context = SecurityContextHolder.getContext();
        var accountId = context.getAuthentication().getName();

        return userRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Transactional
    @PreAuthorize("hasRole('EMPLOYER')")
    public void updateEmployerCompany(EmployerCompanyUpdateRequest employerCompanyUpdateRequest) {
        String accountId = SecurityContextHolder.getContext().getAuthentication().getName();
        Employer employer = employerRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (employer.getCompany() != null) {
            throw new AppException(ErrorCode.EMPLOYER_COMPANY_ALREADY_EXISTS);
        }
        Company company = companyRepository.findById(employerCompanyUpdateRequest.getCompanyId())
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_EXISTED));
        employer.setCompany(company);
        employerRepository.save(employer);
    }
}
