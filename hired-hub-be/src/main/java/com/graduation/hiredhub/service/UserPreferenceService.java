package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public void updatePreferences(String userId, String job, String position, String companyId, String action) throws JsonProcessingException {
        int weight = actionWeights.getOrDefault(action, 0);
        if (weight == 0) return;

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        String preferencesJson = user.getPreferences();

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Map<String, Integer>> preferences = preferencesJson != null
                ? mapper.readValue(preferencesJson, new TypeReference<>() {})
                : new HashMap<>();

        // Update job weight
        preferences.computeIfAbsent("job", k -> new HashMap<>()).merge(job, weight, Integer::sum);

        // Update position weight
        preferences.computeIfAbsent("position", k -> new HashMap<>()).merge(position, weight, Integer::sum);

        // Update company weight
        preferences.computeIfAbsent("companyId", k -> new HashMap<>()).merge(companyId, weight, Integer::sum);

        // Save updated preferences
        user.setPreferences(mapper.writeValueAsString(preferences));
        userRepository.save(user);
    }
}
