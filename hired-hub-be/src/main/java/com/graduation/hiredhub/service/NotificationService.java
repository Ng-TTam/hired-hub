package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.NotificationDTO;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.*;
import com.graduation.hiredhub.entity.enumeration.NotificationType;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.NotificationMapper;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.NotificationRepository;
import com.graduation.hiredhub.repository.SubscriptionRepository;
import com.graduation.hiredhub.repository.UserRepository;
import com.graduation.hiredhub.service.util.NotificationUtils;
import com.graduation.hiredhub.service.util.PageUtils;
import com.graduation.hiredhub.service.util.SecurityUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationService {
    NotificationRepository notificationRepository;
    NotificationMapper notificationMapper;
    PushNotificationService pushNotificationService;
    UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    /**
     * Retrieves a paginated list of notifications for the currently logged-in user.
     *
     * @param pageable the pagination information, such as page number and size.
     * @return a PageResponse containing NotificationDTO objects for the logged-in user.
     * @throws AppException if the user is not authenticated.
     */
    public PageResponse<NotificationDTO> findPageByUserLogin(Pageable pageable) {
        String accountId = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        Page<Notification> notifications = notificationRepository.findAllByUserAccountIdOrderByCreatedAtDesc(accountId, pageable);
        return PageUtils.toPageResponse(notifications.map(notificationMapper::toNotificationDTO));
    }

    public void markAsRead(String id) {
        String accountId = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        Notification notification = notificationRepository
                .findByIdAndUserAccountId(id, accountId).map(
                        existingNotification -> {
                            existingNotification.setIsRead(true);
                            return existingNotification;
                        }
                ).orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED_ACCESS));
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAsReadAll() {
        String accountId = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        notificationRepository.markAsReadAll(accountId);
    }

    public void ping() {
        String accountId = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        User user = userRepository.findByAccountId(accountId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        Notification pong = Notification.builder()
                .user(user)
                .title("pong!!!")
                .content("This is notification")
                .type(NotificationType.SYSTEM_UPDATE)
                .isRead(Boolean.FALSE)
                .build();
        notificationRepository.save(pong);
        pushNotificationService.push(pong);
    }

    /**
     * Retrieves number of unread notifications of current user login
     *
     * @return number of unread notifications
     */
    public int countUnread() {
        String accountId = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        return notificationRepository.countUnreadNotification(accountId);
    }

    public void createNotification(Notification notification) {
        notificationRepository.save(notification);
        pushNotificationService.push(notification);
    }

    public void onCompanyNewPost(Posting posting) {
        Company company = posting.getEmployer().getCompany();
        List<JobSeeker> followers = subscriptionRepository.findAllByCompanyId(company.getId())
                .stream().map(Subscription::getJobSeeker)
                .toList();
        followers.forEach(follower -> {
            Notification notification = NotificationUtils.followedCompanyNewPost(posting, follower);
            createNotification(notification);
        });
    }

    public void onPostingExpired(List<Posting> postings){
        postings.forEach(posting -> {
            Notification notification = NotificationUtils.postingsExpired(posting);
            createNotification(notification);
        });
    }

    public void onPostingExpiring(List<Posting> postings){
        postings.forEach(posting -> {
            Notification notification = NotificationUtils.postingsExpiringSoon(posting);
            createNotification(notification);
        });
    }

    public void onPostingApproved(Posting posting) {
        createNotification(NotificationUtils.postingApproved(posting));
    }
}
