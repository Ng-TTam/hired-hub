package com.graduation.hiredhub.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(301, "Uncategorized error", HttpStatus.BAD_REQUEST),
    NAME_LOGIN_EXISTED(302, "Name login is existed", HttpStatus.BAD_REQUEST),
    INVALID_NAME(303, "Name must be less than 100 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(304, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    INVALID_NUMBER(305, "Phone number is invalid", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(306, "Email number is invalid", HttpStatus.BAD_REQUEST),
    INVALID_GENDER(307, "Gender must be one of the following: male, female, other", HttpStatus.BAD_REQUEST),
    BLANK_USER(308, "Username is required", HttpStatus.BAD_REQUEST),
    BLANK_NUMBER(309, "Number is required", HttpStatus.BAD_REQUEST),
    BLANK_EMAIL(310, "Email is required", HttpStatus.BAD_REQUEST),
    BLANK_GENDER(311, "Gender is required", HttpStatus.BAD_REQUEST),
    BLANK_PASSWORD(312, "Password is required", HttpStatus.BAD_REQUEST),
    BLANK_USERNAME(313, "Name login is required", HttpStatus.BAD_REQUEST),
    DOB_FUTURE(314, "Date of birth must be in the past", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(315, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(316, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    WRONG_CURRENT_PASS(317, "Current password is wrong", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
