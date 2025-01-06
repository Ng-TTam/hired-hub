package com.graduation.hiredhub.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.response.ApiResponse;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.service.BlacklistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class BlacklistFilter extends OncePerRequestFilter {
    private final BlacklistService blacklistService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String accountId = authentication.getName();
            if (blacklistService.isUserBlacklisted(accountId)) {
                ErrorCode errorCode = ErrorCode.ACCOUNT_NOT_AVAILABLE;

                response.setStatus(errorCode.getStatusCode().value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                ApiResponse<?> apiResponse = ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build();

                ObjectMapper objectMapper = new ObjectMapper();

                response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
                response.flushBuffer();
            }
        }

        filterChain.doFilter(request, response);
    }
}
