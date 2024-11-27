package com.graduation.hiredhub.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyStatusRequest {
    @NotNull(message = "BLANK_ID")
    String companyId;
    @NotNull(message = "BLANK_STATUS")
    Boolean isActive;
}
