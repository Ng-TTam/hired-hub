package com.graduation.hiredhub.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubscriptionRequest {
    @NotNull(message = "BLANK_COMPANY_ID")
    String companyId;
}
