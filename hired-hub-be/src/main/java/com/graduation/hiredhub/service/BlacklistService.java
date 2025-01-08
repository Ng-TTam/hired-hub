package com.graduation.hiredhub.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlacklistService {
    StringRedisTemplate stringRedisTemplate;

    @NonFinal
    @Value("${jwt.refreshable}")
    protected int jwtRefreshable;

    private static final String BLACKLIST_PREFIX = "BLACKLIST_";

    public void blacklistAccount(String accountId) {
        stringRedisTemplate.opsForValue().set(BLACKLIST_PREFIX + accountId, "true", jwtRefreshable, TimeUnit.DAYS);
    }

    public void removeAccountFromBlacklist(String accountId) {
        stringRedisTemplate.delete(BLACKLIST_PREFIX + accountId);
    }

    public boolean isUserBlacklisted(String accountId) {
        String isBlacklisted = stringRedisTemplate.opsForValue().get(BLACKLIST_PREFIX + accountId);
        return "true".equals(isBlacklisted);
    }
}
