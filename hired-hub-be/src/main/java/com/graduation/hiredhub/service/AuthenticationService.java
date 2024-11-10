package com.graduation.hiredhub.service;

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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
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
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    StringRedisTemplate stringRedisTemplate;

    @NonFinal
    @Value("${jwt.secret}")
    protected String jwtSecret;

    @NonFinal
    @Value("${jwt.expiration}")
    protected int jwtExpiration;

    @NonFinal
    @Value("${jwt.refreshable}")
    protected int jwtRefreshable;

    static final String PRE_TOKEN = "TOKEN_";
    static final String PRE_REFRESH_TOKEN = "REFRESH_TOKEN_";

    /**
     * authenticate account
     *
     * @param authenticationRequest
     * @return access token and refresh
     */
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        Account account = accountRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), account.getPassword());
        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return createTokenBase(account);
    }

    /**
     * gen token for account
     *
     * @param account
     * @return token
     */
    public String generateToken(Account account) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getId())
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now()
                        .plus(jwtExpiration, ChronoUnit.MINUTES).toEpochMilli()))
                .claim("scope", account.getRole())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(jwtSecret.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
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

    /**
     * Gen access token to refresh token
     *
     * @param refreshRequest
     * @return access token
     */
    public TokenResponse refreshToken(RefreshRequest refreshRequest) {
        String accountId = stringRedisTemplate.opsForValue().get(PRE_REFRESH_TOKEN + refreshRequest.getRefreshToken());

        if (accountId == null) {
            throw new AppException(ErrorCode.TOKEN_EXPIRED);
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

    /**
     * create access token and refresh token for account to sign in and sign up
     *
     * @param account
     * @return access token and refresh
     */
    public AuthenticationResponse createTokenBase(Account account){
        String token = generateToken(account);
        String refreshToken = UUID.randomUUID().toString();

        stringRedisTemplate.opsForValue().set(PRE_TOKEN + token, String.valueOf(account.getId()));
        stringRedisTemplate.expire(PRE_TOKEN + token, Duration.ofMinutes(jwtExpiration));
        stringRedisTemplate.opsForValue().set(PRE_REFRESH_TOKEN + refreshToken, String.valueOf(account.getId()));
        stringRedisTemplate.expire(PRE_REFRESH_TOKEN + refreshToken, Duration.ofDays(jwtRefreshable));

        return AuthenticationResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }
}
