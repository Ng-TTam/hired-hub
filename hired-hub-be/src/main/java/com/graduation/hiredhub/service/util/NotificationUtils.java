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

    public static Notification postingsExpired(Posting posting) {
        return Notification.builder()
                .title("Thông báo hết hạn")
                .content(String.format("Bài đăng %s đã hết hạn", posting.getTitle()))
                .type(NotificationType.JOB_POST_EXPIRED)
                .isRead(Boolean.FALSE)
                .referenceId(posting.getId())
                .user(posting.getEmployer()) //notice for employer owner post is expiring soon
                .build();
    }

    public static Notification postingsExpiringSoon(Posting posting) {
        return Notification.builder()
                .title("Thông báo sắp hết hạn")
                .content(String.format("Bài đăng %s sắp hết hạn", posting.getTitle()))
                .type(NotificationType.JOB_POST_EXPIRING)
                .isRead(Boolean.FALSE)
                .referenceId(posting.getId())
                .user(posting.getEmployer()) //notice for employer owner post is expiring soon
                .build();
    }

    public static Notification postingApproved(Posting posting) {
        return Notification.builder()
                .title("Xác nhận thành công")
                .content(String.format("Bài đăng %s được xác nhận", posting.getTitle()))
                .type(NotificationType.JOB_POST_APPROVED)
                .isRead(Boolean.FALSE)
                .referenceId(posting.getId())
                .user(posting.getEmployer()) //notice for employer owner post is expiring soon
                .build();
    }

    private NotificationUtils() {
    }
}
