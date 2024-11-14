package com.graduation.hiredhub.mapper;

import com.graduation.hiredhub.dto.reqResp.NotificationDTO;
import com.graduation.hiredhub.entity.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationDTO toNotificationDTO(Notification notification);
}
