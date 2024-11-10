package com.graduation.hiredhub.controller;

import com.graduation.hiredhub.dto.request.SubscriptionRequest;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.dto.response.SubscriptionStatusResponse;
import com.graduation.hiredhub.service.SubscriptionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("subscription")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SubscriptionController {
    SubscriptionService subscriptionService;

    @GetMapping("check-status")
    public ApiResponse<SubscriptionStatusResponse> checkSubscriptionStatus(
            @RequestParam("companyId") String companyId) {
        return ApiResponse.<SubscriptionStatusResponse>builder()
                .data(subscriptionService.checkSubscriptionStatus(companyId))
                .build();
    }

    @PostMapping("subscribe")
    public ApiResponse<Void> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.createSubscription(subscriptionRequest);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("unsubscribe")
    public ApiResponse<Void> unsubscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.deleteSubscription(subscriptionRequest);
        return ApiResponse.<Void>builder().build();
    }
}
