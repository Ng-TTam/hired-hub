package com.graduation.hiredhub.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("UNCATEGORIZED", "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED("AUTH", "Unauthenticated", HttpStatus.UNAUTHORIZED),

    INVALID_KEY("INVALID_001","Uncategorized error", HttpStatus.BAD_REQUEST),
    INVALID_NAME("INVALID_002", "Name must be less than 100 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD("INVALID_003", "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_NUMBER("INVALID_004", "Phone number must be between 7 and 13 number", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL("INVALID_005", "Email number is invalid", HttpStatus.BAD_REQUEST),
    INVALID_GENDER("INVALID_006", "Gender must be one of the following: male, female, other", HttpStatus.BAD_REQUEST),
    INVALID_OTP("INVALID_007", "Otp is invalid", HttpStatus.BAD_REQUEST),

    BLANK_EMAIL("BLANK_001", "Email is required", HttpStatus.BAD_REQUEST),
    BLANK_FIRST_NAME("BLANK_002", "First name is required", HttpStatus.BAD_REQUEST),
    BLANK_LAST_NAME("BLANK_003", "Last name is required", HttpStatus.BAD_REQUEST),
    BLANK_PHONE_NUMBER("BLANK_004", "Phone number is required", HttpStatus.BAD_REQUEST),
    BLANK_ADDRESS("BLANK_005", "Address is required", HttpStatus.BAD_REQUEST),
    BLANK_GENDER("BLANK_006", "Gender is required", HttpStatus.BAD_REQUEST),
    BLANK_PASSWORD("BLANK_007", "Password is required", HttpStatus.BAD_REQUEST),

    WRONG_CURRENT_PASS("WRONG_PASS", "Current password is wrong", HttpStatus.BAD_REQUEST),
    DOB_FUTURE("DOB", "Date of birth must be in the past", HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED("EXISTED_001", "User not existed", HttpStatus.NOT_FOUND),
    EMAIL_NOT_EXISTED("EXISTED_002","Email is not exist", HttpStatus.NOT_FOUND),
    KEY_NOT_EXISTED("EXISTED_003", "Key token is not existed", HttpStatus.NOT_FOUND),

    EMAIL_EXISTED("EXISTED_004", "Email is existed", HttpStatus.BAD_REQUEST),
    
    ERROR_SEND_OTP("ERROR","Somethings wrong when send otp", HttpStatus.BAD_REQUEST),
    INTERNAL_ERROR("INTERNAL_ERROR", "Server have some error", HttpStatus.INTERNAL_SERVER_ERROR),

    TOKEN_EXPIRED("LOG_OUT", "Your session is expired. Please login again!!!", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_VERIFY("NOT_VERIFY", "Your account is not verified", HttpStatus.BAD_REQUEST),
    ;

    private final String code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(String code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
