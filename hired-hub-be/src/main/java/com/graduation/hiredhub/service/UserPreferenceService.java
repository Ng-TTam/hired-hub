package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.UserPreferences;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserPreferenceService {
    UserRepository userRepository;

    private final Map<String, Integer> actionWeights = Map.of(
            "view", 1,
            "save", 3,
            "apply", 5
    );
    private static final int MAX_ENTRIES = 7;
    private static final double DECAY_RATE = 0.9;

    @Transactional
    @Async("taskExecutor")
    public void updatePreferences(User user, String job, String position, String companyId, String action){
        int weight = actionWeights.getOrDefault(action, 0);
        if (weight == 0) return;

        String preferencesJson = user.getPreferences();

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Map<String, Integer>> preferences = null;
        try {
            preferences = preferencesJson != null
                    ? mapper.readValue(preferencesJson, new TypeReference<>() {})
                    : new HashMap<>();

            // Apply decay
            preferences.forEach((category, data) -> applyDecay(data));

            // Update job weight
            preferences.computeIfAbsent(UserPreferences.JOB.getKey(), k -> new HashMap<>());
            preferences.put(UserPreferences.JOB.getKey(),
                    maintainTopNEntries(preferences.get(UserPreferences.JOB.getKey()), job, weight));

            // Update position weight
            preferences.computeIfAbsent(UserPreferences.POSITION.getKey(), k -> new HashMap<>());
            preferences.put(UserPreferences.POSITION.getKey(),
                    maintainTopNEntries(preferences.get(UserPreferences.POSITION.getKey()), position, weight));

            // Update company weight
            preferences.computeIfAbsent(UserPreferences.COMPANYID.getKey(), k -> new HashMap<>());
            preferences.put(UserPreferences.COMPANYID.getKey(),
                    maintainTopNEntries(preferences.get(UserPreferences.COMPANYID.getKey()), companyId, weight));

            // Save updated preferences
            user.setPreferences(mapper.writeValueAsString(preferences));
        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.ERROR_PARSING_JSON);
        }

        userRepository.save(user);
    }

    private Map<String, Integer> maintainTopNEntries(Map<String, Integer> data, String key, int weight) {
        data.merge(key, weight, Integer::sum);

        if (data.size() > MAX_ENTRIES) {
            data.entrySet()
                    .stream()
                    .min(Comparator.comparingInt(Map.Entry::getValue))
                    .ifPresent(entry -> data.remove(entry.getKey()));
        }
        return data;
    }

    private void applyDecay(Map<String, Integer> data) {
        data.replaceAll((k, v) -> (int) Math.round(v * UserPreferenceService.DECAY_RATE));
        //remove key has value=0
        data.entrySet().removeIf(entry -> entry.getValue() == 0);
    }
}
