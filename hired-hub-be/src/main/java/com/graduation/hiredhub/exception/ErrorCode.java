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
    INVALID_COMPANY_NAME("INVALID_011","Company name must be less than 70 characters", HttpStatus.BAD_REQUEST),
    INVALID_TAX_CODE("INVALID_012","Tax code must be less than 20 characters", HttpStatus.BAD_REQUEST),
    INVALID_WEB_SITE("INVALID_013","Website must be less than 50 characters", HttpStatus.BAD_REQUEST),

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
    BLANK_COMPANY_NAME("BLANK_016", "Company name is required", HttpStatus.BAD_REQUEST),
    BLANK_POSITION_EMPLOYER("BLANK_017", "Position of employer is required", HttpStatus.BAD_REQUEST),
    BLANK_TAX_CODE("BLANK_018", "Tax code is required", HttpStatus.BAD_REQUEST),
    BLANK_WEBSITE("BLANK_019", "Link website of company is required", HttpStatus.BAD_REQUEST),
    BLANK_EXPIRE("BLANK_019", "Expire date of post is required", HttpStatus.BAD_REQUEST),

    WRONG_CURRENT_PASS("WRONG_PASS", "Current password is wrong", HttpStatus.BAD_REQUEST),
    DOB_FUTURE("DOB_FUTURE", "Date of birth must be in the past", HttpStatus.BAD_REQUEST),
    EXPIRED_PAST("EXPIRED_PAST", "Expire date must be in the future", HttpStatus.BAD_REQUEST),

    USER_NOT_PENDING("ERROR_USER_001", "User is not in PENDING status", HttpStatus.BAD_REQUEST),
    POSTING_NOT_PENDING("ERROR_POST_001","Post is not in PENDING status",HttpStatus.BAD_REQUEST),
    POSTING_NOT_SAVED("ERROR_POST_002","Post is not saved",HttpStatus.BAD_REQUEST),
    POSTING_PENDING("ERROR_POST_003","Post is in PENDING",HttpStatus.BAD_REQUEST),
    EMPLOYER_NOT_ACTIVATE("ERROR_USER_002","Employer is not ACTIVATE",HttpStatus.BAD_REQUEST),
    POSTING_EXPIRED("ERROR_POST_004", "Posting is expired",HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED("EXISTED_001", "User not existed", HttpStatus.NOT_FOUND),
    EMAIL_NOT_EXISTED("EXISTED_002","Email is not exist", HttpStatus.NOT_FOUND),
    KEY_NOT_EXISTED("EXISTED_003", "Key token is not existed", HttpStatus.NOT_FOUND),
    POSTING_NOT_EXISTED("EXISTED_004", "Posting is not existed", HttpStatus.NOT_FOUND),
    APPLICATION_NOT_EXISTED("EXISTED_005", "Application is not existed", HttpStatus.NOT_FOUND),
    EMAIL_EXISTED("EXISTED_006", "Email is existed", HttpStatus.BAD_REQUEST),
    CV_NOT_EXISTED("EXISTED_101","CV is not exist", HttpStatus.NOT_FOUND),
    COMPANY_NOT_EXISTED("EXISTED_113", "Company not existed", HttpStatus.NOT_FOUND),
    JOB_DESCRIPTION_NOT_EXISTED("EXISTED_114", "Job Description not existed", HttpStatus.NOT_FOUND),
    WORK_ADDRESS_NOT_EXISTED("EXISTED_115", "Work address not existed", HttpStatus.NOT_FOUND),
    CV_NOT_FOUND("NOT_FOUND", "CV not found", HttpStatus.NOT_FOUND),

    APPLICATION_ALREADY_EXISTS("ALREADY_001", "application already exists",HttpStatus.BAD_REQUEST),
    EMPLOYER_COMPANY_ALREADY_EXISTS("ALREADY_123", "The employer already has a company", HttpStatus.BAD_REQUEST),
    EMPLOYER_COMPANY_NOT_EXISTS("ALREADY_124", "The employer has not updated company information", HttpStatus.BAD_REQUEST),
    EMPLOYER_COMPANY_NOT_APPROVED("ALREADY_124", "The employer's company is not approved", HttpStatus.BAD_REQUEST),

    ERROR_SEND_OTP("ERROR","Somethings wrong when send otp", HttpStatus.BAD_REQUEST),
    INTERNAL_ERROR("INTERNAL_ERROR", "Server have some error", HttpStatus.INTERNAL_SERVER_ERROR),
    ERROR_PARSING_JSON("ERROR_001", "Error parsing JSON", HttpStatus.INTERNAL_SERVER_ERROR),
    ERROR_SERIALIZING_JSON("ERROR_002", "Error serializing JSON", HttpStatus.INTERNAL_SERVER_ERROR),

    TOKEN_EXPIRED("LOG_OUT", "Your session is expired. Please login again!!!", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_VERIFY("NOT_VERIFY", "Your account is not verified", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_EXISTED("EXISTED_999", "Account is not existed", HttpStatus.BAD_REQUEST)
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
