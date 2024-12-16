package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingDetailResponse;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.mapper.PostingMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendationService {
    PostingMapper postingMapper;

    private static final String PREFERENCES_JOB = "job";
    private static final String PREFERENCES_POSITION = "position";
    private static final String PREFERENCES_COMPANY_ID = "companyId";

    public int calculateScore(Posting posting, Map<String, Map<String, Integer>> preferences) {
        int score = 0;

        // Add job weight
        if (preferences.containsKey(PREFERENCES_JOB) &&
                preferences.get(PREFERENCES_JOB).containsKey(posting.getMainJob().getName())) {
            score += preferences.get(PREFERENCES_JOB).get(posting.getMainJob().getName());
        }

        // Add position weight
        if (preferences.containsKey(PREFERENCES_POSITION) &&
                preferences.get(PREFERENCES_POSITION).containsKey(posting.getPosition().getName())) {
            score += preferences.get(PREFERENCES_POSITION).get(posting.getPosition().getName());
        }

        // Add company weight
        if (preferences.containsKey(PREFERENCES_COMPANY_ID) &&
                preferences.get(PREFERENCES_COMPANY_ID).containsKey(String.valueOf(posting.getEmployer().getCompany().getId()))) {
            score += preferences.get(PREFERENCES_COMPANY_ID).get(String.valueOf(posting.getEmployer().getCompany().getId()));
        }

        return score;
    }

    public PageResponse<PostingDetailResponse> recommendPosts(User user, List<Posting> postings, int page, int size) throws JsonProcessingException {
        String preferencesJson = user.getPreferences();

        if (preferencesJson == null) {
            return getPagedResult(postings, page, size);
        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Map<String, Integer>> preferences = mapper.readValue(preferencesJson, new TypeReference<>() {
        });

        // Calculate scores and sort postings
        List<Posting> recommendedPostings = postings.stream()
                .map(post -> Map.entry(post, calculateScore(post, preferences))) // Map each posting to its score
                .filter(entry -> entry.getValue() > 0) // Filter out postings with a score of 0
                .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue())) // Sort by score in descending order
                .map(Map.Entry::getKey) // Extract postings
                .collect(Collectors.toList()); // Collect into a list

        return getPagedResult(recommendedPostings.isEmpty() ? postings : recommendedPostings, page, size); // Return paged result
    }

    private PageResponse<PostingDetailResponse> getPagedResult(List<Posting> postings, int page, int size) {
        int totalElements = postings.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int start = page * size;
        int end = Math.min(start + size, totalElements);

        // Create the paginated response
        List<Posting> subList = postings.subList(start, end);

        return PageResponse.<PostingDetailResponse>builder()
                .currentPage(page)
                .totalPages(totalPages)
                .pageSize(size)
                .totalElements(totalElements)
                .data(subList.stream()
                        .map(postingMapper::toPostingDetailResponse)
                        .toList())
                .build();
    }
}
