package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingStatusRequest {
    @NotNull(message = "BLANK_ID")
    String postingId;
    @NotNull(message = "BLANK_STATUS")
    PostingStatus status;
}
