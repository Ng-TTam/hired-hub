package com.graduation.hiredhub.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("UNCATEGORIZED", "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED("AUTH_001", "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED_ACCESS("AUTH_002","Access to this endpoint is not allowed.", HttpStatus.UNAUTHORIZED),

    INVALID_KEY("INVALID_001","Uncategorized error", HttpStatus.BAD_REQUEST),
    INVALID_NAME("INVALID_002", "Name must be less than 100 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD("INVALID_003", "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_NUMBER("INVALID_004", "Phone number must be between 7 and 13 number", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL("INVALID_005", "Email number is invalid", HttpStatus.BAD_REQUEST),
    INVALID_OTP("INVALID_007", "Otp is invalid", HttpStatus.BAD_REQUEST),
    INVALID_NUM_OF_POSITION("INVALID_008", "Number of position must be greater than or equal to 1", HttpStatus.BAD_REQUEST),
    INVALID_POSITION_EMPLOYER("INVALID_009","Position must be less than 20 characters", HttpStatus.BAD_REQUEST),
    INVALID_TITLE_POSTING("INVALID_010","Title of posting must be less than 100 characters", HttpStatus.BAD_REQUEST),

    BLANK_EMAIL("BLANK_001", "Email is required", HttpStatus.BAD_REQUEST),
    BLANK_FIRST_NAME("BLANK_002", "First name is required", HttpStatus.BAD_REQUEST),
    BLANK_LAST_NAME("BLANK_003", "Last name is required", HttpStatus.BAD_REQUEST),
    BLANK_PHONE_NUMBER("BLANK_004", "Phone number is required", HttpStatus.BAD_REQUEST),
    BLANK_ADDRESS("BLANK_005", "Address is required", HttpStatus.BAD_REQUEST),
    BLANK_GENDER("BLANK_006", "Gender is required", HttpStatus.BAD_REQUEST),
    BLANK_PASSWORD("BLANK_007", "Password is required", HttpStatus.BAD_REQUEST),
    BLANK_TITLE_POSTING("BLANK_008","Title of posting is required", HttpStatus.BAD_REQUEST),
    BLANK_JOB_TYPE("BLANK_009", "Job type is required", HttpStatus.BAD_REQUEST),
    BLANK_JOB_DESCRIPTION("BLANK_010", "Job description is required", HttpStatus.BAD_REQUEST),
    BLANK_MAIN_JOB("BLANK_011", "Main job is required", HttpStatus.BAD_REQUEST),
    BLANK_CURRENCY_UNIT("BLANK_012", "Currency unit is required", HttpStatus.BAD_REQUEST),
    BLANK_POSITION("BLANK_013", "Position is required", HttpStatus.BAD_REQUEST),
    BLANK_NUM_OF_POSITION("BLANK_014", "Number of position is required", HttpStatus.BAD_REQUEST),
    BLANK_EXPERIENCE_REQUIRE("BLANK_015", "Experience is required", HttpStatus.BAD_REQUEST),


    WRONG_CURRENT_PASS("WRONG_PASS", "Current password is wrong", HttpStatus.BAD_REQUEST),
    DOB_FUTURE("DOB_FUTURE", "Date of birth must be in the past", HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED("EXISTED_001", "User not existed", HttpStatus.NOT_FOUND),
    EMAIL_NOT_EXISTED("EXISTED_002","Email is not exist", HttpStatus.NOT_FOUND),
    KEY_NOT_EXISTED("EXISTED_003", "Key token is not existed", HttpStatus.NOT_FOUND),
    POSTING_NOT_EXISTED("EXISTED_004", "Posting is not existed", HttpStatus.NOT_FOUND),
    APPLICATION_NOT_EXISTED("EXISTED_005", "Application is not existed", HttpStatus.NOT_FOUND),

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
