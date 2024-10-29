package com.graduation.hiredhub.security;

import org.springframework.stereotype.Component;

import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.repository.CVRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Component("CVSecurity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CVSecurity {
    CVRepository cvRepository;

    public boolean isCVOwner(String cvId, String accountId){
        CV cv = cvRepository.findById(cvId).orElseThrow(
                () -> new AppException(ErrorCode.CV_NOT_EXISTED));
        return cv.getJobSeeker().getAccount().getId().equals(accountId); 
    }
}
