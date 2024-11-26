package com.graduation.hiredhub.service.util;

import com.graduation.hiredhub.entity.Notification;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.NotificationType;

public class NotificationUtils {
    public static Notification followedCompanyNewPost(Posting posting, User user) {
        return Notification.builder()
                .type(NotificationType.FOLLOWED_COMPANY_NEW_POST)
                .title("Tin tuyển dụng")
                .content(String.format("%s có tin tuyển dụng mới - %s, xem ngay", posting.getEmployer().getCompany().getName(), posting.getTitle()))
                .referenceId(posting.getId())
                .user(user)
                .isRead(false)
                .build();
    }

    private NotificationUtils() {
    }
}
