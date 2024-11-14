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
public class SavePostRequest {
    @NotNull(message = "BLANK_POST_ID")
    String postId;
}
