package com.graduation.hiredhub.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.graduation.hiredhub.dto.request.CVRequest;
import com.graduation.hiredhub.dto.response.CVResponse;
import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.CVMapper;
import com.graduation.hiredhub.repository.CVRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CVService {
    CVRepository cVRepository;
    JobSeekerRepository jobSeekerRepository;
    CVMapper cvMapper;
    AccountService accountService;

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public CVResponse createCV(CVRequest cvRequest){
        CV cv = cvMapper.toCV(cvRequest);
        cv.setJobSeeker(getJobSeekerByAccount());
        try {
            cVRepository.save(cv);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return cvMapper.toCVResponse(cv);
    }

    @PreAuthorize("@CVSecurity.isCVOwner(#cvid, authentication.name)")
    public CVResponse updateCV(String cvid, CVRequest cvRequest){
        CV cv = cVRepository.findById(cvid)
            .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        
        cvMapper.updateCV(cv, cvRequest);
        cv.setJobSeeker(getJobSeekerByAccount());
        try {
            cVRepository.save(cv);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return cvMapper.toCVResponse(cv);
    }

    @PreAuthorize("@CVSecurity.isCVOwner(#cvid, authentication.name)")
    public  CVResponse deleteCV(String cvid){
        CV cv = cVRepository.findById((cvid))
                .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        try {
            cVRepository.delete(cv);
        }catch (Exception e){
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return cvMapper.toCVResponse(cv);
    }

    JobSeeker getJobSeekerByAccount(){
        return jobSeekerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));   
    }


    
}
