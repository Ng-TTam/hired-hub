package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.dto.reqResp.ScaleCategoryDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyCreationRequest {

    @Size(max = 70, message = "INVALID_COMPANY_NAME")
    @NotBlank(message = "BLANK_COMPANY_NAME")
    String name;

    @Size(max = 20, message = "INVALID_TAX_CODE")
    @NotBlank(message = "BLANK_TAX_CODE")
    String taxCode;

    Instant establishYear;

    MultipartFile logo;

    @NotBlank(message = "BLANK_ADDRESS")
    String address;

    @Size(max = 50, message = "INVALID_WEB_SITE")
    @NotBlank(message = "BLANK_WEBSITE")
    String website;

    MultipartFile coverImage;

    String description;

    ScaleCategoryDTO scaleCategory;
}
