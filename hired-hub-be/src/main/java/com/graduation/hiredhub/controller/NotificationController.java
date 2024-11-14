package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.reqResp.NotificationDTO;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("notification")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<NotificationDTO>>> getNotifications(Pageable pageable) {
        PageResponse<NotificationDTO> notifications = notificationService.findPageByUserLogin(pageable);

        int unreadCount = notificationService.countUnread();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Unread-Count", String.valueOf(unreadCount));

        ApiResponse<PageResponse<NotificationDTO>> response = ApiResponse.<PageResponse<NotificationDTO>>builder()
                .data(notifications)
                .build();
        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @GetMapping("mark-as-read/{id}")
    public ApiResponse<Void> markAsRead(@PathVariable("id") String id) {
        notificationService.markAsRead(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("mark-as-read-all")
    public ApiResponse<Void> markAsReadAll() {
        notificationService.markAsReadAll();
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("ping")
    public ApiResponse<Void> ping() {
        notificationService.ping();
        return ApiResponse.<Void>builder().build();
    }
}
