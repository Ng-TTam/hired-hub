package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.NotificationDTO;
import com.graduation.hiredhub.entity.Notification;
import com.graduation.hiredhub.mapper.NotificationMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PushNotificationService {
    SimpMessagingTemplate simpMessagingTemplate;
    NotificationMapper notificationMapper;

    public void push(Notification notification) {
        NotificationDTO notificationDTO = notificationMapper.toNotificationDTO(notification);
        String userId = notification.getUser().getId();
        simpMessagingTemplate.convertAndSend("/topic/notifications/" + userId, notificationDTO);
    }
}
