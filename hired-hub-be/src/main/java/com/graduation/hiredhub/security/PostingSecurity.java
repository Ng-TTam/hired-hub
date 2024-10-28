package com.graduation.hiredhub.security;

import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.PostingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component("postingSecurity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostingSecurity {
    PostingRepository postingRepository;

    public boolean isPostingOwner(String postingId, String accountId){
        Posting posting = postingRepository.findById(postingId).orElseThrow(
                () -> new AppException(ErrorCode.POSTING_NOT_EXISTED)
        );
        return posting.getEmployer().getAccount().getId().equals(accountId);
    }
}
