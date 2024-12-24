package com.graduation.hiredhub.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.dto.response.PostingDetailResponse;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.UserPreferences;
import com.graduation.hiredhub.mapper.PostingMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendationService {
    PostingMapper postingMapper;

    private int calculateScore(Posting posting,
                               Map<String, Integer> jobWeights,
                               Map<String, Integer> positionWeights,
                               Map<String, Integer> companyWeights) {
        int score = 0;

        score += jobWeights.getOrDefault(posting.getMainJob().getName(), 0);
        score += positionWeights.getOrDefault(posting.getPosition().getName(), 0);
        score += companyWeights.getOrDefault(posting.getEmployer().getCompany().getId(), 0);

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

        // Tiền xử lý trọng số
        Map<String, Integer> jobWeights = preferences.getOrDefault(UserPreferences.JOB.getKey(), Map.of());
        Map<String, Integer> positionWeights = preferences.getOrDefault(UserPreferences.POSITION.getKey(), Map.of());
        Map<String, Integer> companyWeights = preferences.getOrDefault(UserPreferences.COMPANYID.getKey(), Map.of());

        List<Posting> recommendedPostings = postings.stream()
                .map(post -> Map.entry(post, calculateScore(post, jobWeights, positionWeights, companyWeights)))
                .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()))
                .map(Map.Entry::getKey)
                .toList();

        return getPagedResult(recommendedPostings.isEmpty() ? postings : recommendedPostings, page, size); // Return paged result
    }

    private PageResponse<PostingDetailResponse> getPagedResult(List<Posting> postings, int page, int size) {
        int totalElements = postings.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int start = (page - 1) * size;
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
