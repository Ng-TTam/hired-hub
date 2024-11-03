package com.graduation.hiredhub.dto.reqResp;


import com.graduation.hiredhub.entity.enumeration.NotificationType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDTO {
    String id;
    String title;
    String content;
    Boolean isRead;
    NotificationType type;
    String referenceId;
    Instant createdAt;
}
