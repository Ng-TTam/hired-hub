package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.request.AccountStatusRequest;
import com.graduation.hiredhub.dto.request.AuthResetPassRequest;
import com.graduation.hiredhub.dto.request.EmployerAccountCreationRequest;
import com.graduation.hiredhub.dto.request.UserAccountCreationRequest;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.entity.*;
import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.UserMapper;
import com.graduation.hiredhub.repository.AccountRepository;
import com.graduation.hiredhub.repository.EmployerRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.PostingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {
    AccountRepository accountRepository;
    JobSeekerRepository jobSeekerRepository;
    EmployerRepository employerRepository;
    PasswordEncoder passwordEncoder;
    StringRedisTemplate stringRedisTemplate;
    OtpService otpService;
    AuthenticationService authenticationService;
    UserMapper userMapper;
    PostingRepository postingRepository;
    BlacklistService blacklistService;

    private static final String SIGNUP_OTP = "SIGNUP"; //type of otp
    private static final String RESET_OTP = "RESET";
    private static final String PRE_RESET_PASS = "TOKEN_RESET_PASS_";
    private static final int TTL_TOKEN_RESET_CACHE = 5;

    /**
     * Sign up for job_seeker
     * Create account, jobSeeker and send otp -> gen token
     * Account job_seeker is verified by OTP code sent by email
     *
     * @param userAccountCreationRequest contain user, account to create
     * @return access token and refresh token
     */
    @Transactional
    public AuthenticationResponse signUp(UserAccountCreationRequest userAccountCreationRequest) {
        if (accountRepository.existsByEmail(userAccountCreationRequest.getAccount().getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        Account account = Account.builder()
                .email(userAccountCreationRequest.getAccount().getEmail())
                .password(passwordEncoder.encode(userAccountCreationRequest.getAccount().getPassword()))
                .role(Role.JOB_SEEKER)
                .status(Status.PENDING)
                .build();

        try {
            accountRepository.save(account);

            JobSeeker jobSeeker = userMapper.toJobSeeker(userAccountCreationRequest.getUser());
            jobSeeker.setAccount(account);
            jobSeekerRepository.save(jobSeeker);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        otpService.send(SIGNUP_OTP, userAccountCreationRequest.getAccount().getEmail());

        return authenticationService.createTokenBase(account);
    }


    /**
     * Sign up for employer
     * create account, employer and send otp -> gen token
     *
     * @param employerAccountCreationRequest contain user, companyName, position to create account
     * @return access token and refresh token
     */
    @Transactional
    public AuthenticationResponse employerSignUp(EmployerAccountCreationRequest employerAccountCreationRequest) {
        if (accountRepository.existsByEmail(employerAccountCreationRequest.getAccount().getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        Account account = Account.builder()
                .email(employerAccountCreationRequest.getAccount().getEmail())
                .password(passwordEncoder.encode(employerAccountCreationRequest.getAccount().getPassword()))
                .role(Role.EMPLOYER)
                .status(Status.PENDING)
                .build();

        try {
            accountRepository.save(account);

            Employer employer = userMapper.toEmployer(employerAccountCreationRequest.getUser());
            employer.setAccount(account);
            employerRepository.save(employer);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        otpService.send(SIGNUP_OTP, employerAccountCreationRequest.getAccount().getEmail());

        return authenticationService.createTokenBase(account);
    }

    /**
     * Resend otp when otp expire, otp invalid
     * Can resend otp if created account
     */
    @PreAuthorize("hasRole('JOB_SEEKER') or hasRole('EMPLOYER')")
    public void resendOtpSignUp() {
        otpService.send(SIGNUP_OTP, getAccountInContext().getEmail());
    }

    /**
     * Send otp to reset password
     *
     * @param authResetPassRequest account contain new pass
     */
    public void otpResetPassword(AuthResetPassRequest authResetPassRequest) {
        var account = accountRepository.findByEmail(authResetPassRequest.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        otpService.send(RESET_OTP, account.getEmail());
    }

    /**
     * Send key and store key after verify otp
     * Key store in cache by form: TOKEN_RESET_PASS_token: accountId
     *
     * @param authResetPassRequest account contain new pass
     * @param otp:                 code to verify
     * @return key
     */
    public String verifyOtpResetPassword(AuthResetPassRequest authResetPassRequest, String otp) {
        if (!otpService.verify(RESET_OTP, authResetPassRequest.getEmail(), otp))
            throw new AppException(ErrorCode.INVALID_OTP);

        var account = accountRepository.findByEmail(authResetPassRequest.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        String key = UUID.randomUUID().toString();
        try {
            stringRedisTemplate.opsForValue().set(PRE_RESET_PASS + key, account.getId());
            stringRedisTemplate.expire(PRE_RESET_PASS + key, Duration.ofMinutes(TTL_TOKEN_RESET_CACHE));
            return key;
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    /**
     * Authenticate before using verify otp if otp invalid, must resend otp
     *
     * @param otp: code need verify
     * @return message: "Your account verified successfully."
     */
    @Transactional
    @PreAuthorize("hasRole('JOB_SEEKER') or hasRole('EMPLOYER')")
    public String verifyOtp(String otp) {
        Account account = getAccountInContext();

        if (!account.getStatus().equals(Status.PENDING)) throw new AppException(ErrorCode.USER_NOT_PENDING);

        if (!otpService.verify(SIGNUP_OTP, account.getEmail(), otp))
            throw new AppException(ErrorCode.INVALID_OTP);

        try {
            account.setStatus(Status.ACTIVATE);
            accountRepository.save(account);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        return "Your account verified successfully.";
    }

    /**
     * Reset password of account in db, can not authenticate
     *
     * @param authChangePassRequest: account pass to reset
     * @param key:                   token save in redis to check
     * @return boolean
     */
    @Transactional
    public boolean resetPassword(AuthResetPassRequest authChangePassRequest, String key) {
        String accountId = stringRedisTemplate.opsForValue().get(PRE_RESET_PASS + key);

        if (accountId == null)
            throw new AppException(ErrorCode.KEY_NOT_EXISTED);

        var account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        account.setPassword(passwordEncoder.encode(authChangePassRequest.getNewPassword()));
        try {
            accountRepository.save(account);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return true;
    }

    /**
     * Get account store in token -> subject token: accountId
     *
     * @return account in context
     */
    public Account getAccountInContext() {
        var context = SecurityContextHolder.getContext();
        var accountId = context.getAuthentication().getName();

        return accountRepository.findById(accountId).orElseThrow(
                () -> new AppException(ErrorCode.EMAIL_NOT_EXISTED)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void updateStatus(AccountStatusRequest accountStatusRequest) {
        Account account = accountRepository.findById(accountStatusRequest.getAccountId())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXISTED));

        if (account.getRole().equals(Role.EMPLOYER)) {
            Employer employer = employerRepository.findByAccountId(account.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

            Company company = Optional.ofNullable(employer.getCompany())
                    .orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_COMPANY_NOT_EXISTS));

            if (Boolean.FALSE.equals(company.getIsActive()))
                throw new AppException(ErrorCode.EMPLOYER_COMPANY_NOT_APPROVED);

            if (accountStatusRequest.getStatus().equals(Status.DEACTIVATE)) {
                List<Posting> postings = postingRepository.findByEmployerId(employer.getId());
                postings.forEach(posting -> {
                    if (posting.getStatus().equals(PostingStatus.ACTIVATE)) {
                        posting.setStatus(PostingStatus.DEACTIVATE);
                    }
                });
                postingRepository.saveAll(postings);
            }
        }

        account.setStatus(accountStatusRequest.getStatus());
        accountRepository.save(account);

        blacklistService.removeAccountFromBlacklist(account.getId());
        if (account.getStatus().equals(Status.DEACTIVATE)) {
            blacklistService.blacklistAccount(account.getId());
        }
    }
}
