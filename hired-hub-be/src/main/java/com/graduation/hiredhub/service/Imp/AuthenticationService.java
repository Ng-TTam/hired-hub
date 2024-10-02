package com.graduation.hiredhub.service.Imp;

import com.graduation.hiredhub.dto.response.AuthenticationResponse;
import com.graduation.hiredhub.dto.response.TokenResponse;
import com.graduation.hiredhub.dto.response.VerifyTokenResponse;
import com.graduation.hiredhub.dto.request.AuthenticationRequest;
import com.graduation.hiredhub.dto.request.LogoutRequest;
import com.graduation.hiredhub.dto.request.RefreshRequest;
import com.graduation.hiredhub.dto.request.VerifyTokenRequest;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.ValidToken;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.UserRepository;
import com.graduation.hiredhub.repository.ValidTokenRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@Slf4j
public class AuthenticationService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ValidTokenRepository validTokenRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    @Value("${jwt.refreshable}")
    private int jwtRefreshable;

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest){
        User user = userRepository.findByNameLogin(authenticationRequest.getNameLogin())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(7);

        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword());
        if(!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = generateToken(user);
        String refreshToken = UUID.randomUUID().toString();

        ValidToken validToken = ValidToken.builder()
                .token(token)
                .refreshToken(refreshToken)
                .expiryTimeRefresh(new Date(Instant.now()
                        .plus(jwtRefreshable, ChronoUnit.SECONDS).toEpochMilli()))
                .build();
        validTokenRepository.save(validToken);

        return AuthenticationResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    private String generateToken(User user){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getNameLogin())
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now()
                        .plus(jwtExpiration, ChronoUnit.SECONDS).toEpochMilli()))
                .claim("scope", buildScope(user))
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
        ValidToken validToken = validTokenRepository.findByRefreshToken(refreshRequest.getRefreshToken());

        if(new Date().after(validToken.getExpiryTimeRefresh())){
            validTokenRepository.delete(validToken);//delete refresh token over expiry time
            throw new RuntimeException("Please login again");
        }

        var signedJWT = verifyToken(validToken.getToken(), true);

        var nameLogin = signedJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByNameLogin(nameLogin)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        var token = generateToken(user);

        validToken.setToken(token);
        validToken.setExpiryTimeRefresh(new Date(Instant.now()
                .plus(jwtRefreshable, ChronoUnit.SECONDS).toEpochMilli()));
        validTokenRepository.save(validToken);

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

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);

            ValidToken validToken = validTokenRepository.findByToken(request.getToken());
            validTokenRepository.delete(validToken);
        } catch (RuntimeException e){
            log.info("Token already expired");
        }
    }

    private String buildScope(User user){
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles())) //add role and permission
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
                if (!CollectionUtils.isEmpty(role.getPermissions()))
                    role.getPermissions()
                            .forEach(permission -> stringJoiner.add(permission.getName()));
            });

        return stringJoiner.toString();
    }
}
