package com.graduation.hiredhub.service.util;

import com.graduation.hiredhub.entity.*;
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

    public static Notification applicationStatusChanged(Application application) {
        Notification.NotificationBuilder builder = Notification.builder();
        builder.type(NotificationType.APPLICATION_STATUS_UPDATE);
        builder.title("Phản hồi từ nhà tuyển dụng");
        String status = switch (application.getStatus()) {
            case PENDING -> "nhận được";
            case APPROVED -> "chấp nhận";
            case REJECTED -> "từ chối";
        };
        builder.content(String.format("Nhà tuyển dụng đã %s đơn ứng tuyển của bạn cho %s", status, application.getPosting().getTitle()));
        builder.referenceId(application.getPosting().getId());
        builder.user(application.getCv().getJobSeeker());
        builder.isRead(false);
        return builder.build();
    }

    public static Notification newCandidate(Application application) {
        JobSeeker jobSeeker = application.getCv().getJobSeeker();
        return Notification.builder()
                .type(NotificationType.NEW_CANDIDATE)
                .title("Ứng viên mới")
                .content(String.format("%s %s vừa ứng tuyển vào %s", jobSeeker.getFirstName(), jobSeeker.getLastName(), application.getPosting().getTitle()))
                .user(application.getPosting().getEmployer())
                .isRead(false)
                .build();
    }

    public static Notification candidateUpdateApplication(Application application) {
        JobSeeker jobSeeker = application.getCv().getJobSeeker();
        return Notification.builder()
                .type(NotificationType.APPLICATION_CV_UPDATE)
                .title("Ứng viên vừa cập nhật CV")
                .content(String.format("%s %s vừa cập nhật CV ứng tuyển vào %s", jobSeeker.getFirstName(), jobSeeker.getLastName(), application.getPosting().getTitle()))
                .user(application.getPosting().getEmployer())
                .isRead(false)
                .build();
    }

    public static Notification savedPostReminder(SavedPost savedPost) {
        return Notification.builder()
                .type(NotificationType.FAVORITE_JOB_REMINDER)
                .title("Lời nhắc")
                .content(String.format("Hạn cuối để ứng tuyển %s, ứng tuyển ngay nào", savedPost.getPosting().getTitle()))
                .referenceId(savedPost.getPosting().getId())
                .user(savedPost.getJobSeeker())
                .isRead(false)
                .build();
    }

    public static Notification postingStatusChange(Posting posting, boolean isApprove) {
        return Notification.builder()
                .type(NotificationType.POSTING_STATUS_CHANGE)
                .title("Hệ thống")
                .content(String.format("Tin tuyển dụng \"%s\" của bạn %s", posting.getTitle(),
                        switch (posting.getStatus()) {
                            case ACTIVATE -> isApprove ? "đã được phê duyệt" : "đã được hiển thị";
                            case REJECTED -> "đã bị từ chối";
                            case PENDING -> "đang chờ phê duyệt";
                            default -> "đã được ẩn đi";
                        }
                ))
                .referenceId(posting.getId())
                .user(posting.getEmployer())
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
                .user(posting.getEmployer())
                .build();
    }

    public static Notification postingsExpiringSoon(Posting posting) {
        return Notification.builder()
                .title("Thông báo sắp hết hạn")
                .content(String.format("Bài đăng %s sắp hết hạn", posting.getTitle()))
                .type(NotificationType.JOB_POST_EXPIRING)
                .isRead(Boolean.FALSE)
                .referenceId(posting.getId())
                .user(posting.getEmployer())
                .build();
    }

    private NotificationUtils() {
    }
}
