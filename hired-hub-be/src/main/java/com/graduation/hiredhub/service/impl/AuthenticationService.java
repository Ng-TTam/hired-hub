package com.graduation.hiredhub.service.impl;

import com.graduation.hiredhub.dto.request.AuthenticationRequest;
import com.graduation.hiredhub.dto.request.LogoutRequest;
import com.graduation.hiredhub.dto.request.RefreshRequest;
import com.graduation.hiredhub.dto.request.VerifyTokenRequest;
import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.TokenResponse;
import com.graduation.hiredhub.dto.response.VerifyTokenResponse;
import com.graduation.hiredhub.entity.Account;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.AccountRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
@Slf4j
public class AuthenticationService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final StringRedisTemplate stringRedisTemplate;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    @Value("${jwt.refreshable}")
    private int jwtRefreshable;

    public AuthenticationService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, StringRedisTemplate stringRedisTemplate) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        Account account = accountRepository.findByEmail(authenticationRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), account.getPassword());
        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = generateToken(account);
        String refreshToken = UUID.randomUUID().toString();

        stringRedisTemplate.opsForValue().set(token, String.valueOf(account.getId()));
        stringRedisTemplate.expire(token, Duration.ofMinutes(jwtExpiration));
        stringRedisTemplate.opsForValue().set(refreshToken, String.valueOf(account.getId()));
        stringRedisTemplate.expire(refreshToken, Duration.ofDays(jwtRefreshable));

        return AuthenticationResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    private String generateToken(Account account) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getEmail())
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now()
                        .plus(jwtExpiration, ChronoUnit.SECONDS).toEpochMilli()))
                .claim("scope", account.getRole())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(jwtSecret.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public VerifyTokenResponse verify(VerifyTokenRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token, false);
        } catch (RuntimeException e) {
            isValid = false;
        }

        return VerifyTokenResponse.builder().valid(isValid).build();
    }

    public TokenResponse refreshToken(RefreshRequest refreshRequest) throws ParseException, JOSEException {
        String accountId = stringRedisTemplate.opsForValue().get(refreshRequest.getRefreshToken());

        if (accountId == null) {
            throw new RuntimeException("Please login again");
        }

        var user = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        String token = generateToken(user);

        stringRedisTemplate.opsForValue().set(token, accountId);
        stringRedisTemplate.expire(token, Duration.ofMinutes(jwtExpiration));

        return TokenResponse.builder().token(token).build();
    }

    public SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(jwtSecret.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime()
                .toInstant().plus(jwtRefreshable, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    //need update
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            stringRedisTemplate.delete(request.getToken());
        } catch (RuntimeException e) {
            log.info("Token already expired");
        }
    }
}
