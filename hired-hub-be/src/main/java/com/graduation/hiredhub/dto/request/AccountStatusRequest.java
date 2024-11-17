package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.Status;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountStatusRequest {
    @NotNull(message = "BLANK_ID")
    String accountId;
    @NotNull(message = "BLANK_STATUS")
    Status status;
}
