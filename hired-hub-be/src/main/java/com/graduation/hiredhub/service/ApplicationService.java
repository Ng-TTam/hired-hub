package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.request.ApplicationRequest;
import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.Application;
import com.graduation.hiredhub.entity.CV;
import com.graduation.hiredhub.entity.Employer;
import com.graduation.hiredhub.entity.JobSeeker;
import com.graduation.hiredhub.entity.Posting;
import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.ApplicationMapper;
import com.graduation.hiredhub.repository.ApplicationRepository;
import com.graduation.hiredhub.repository.CVRepository;
import com.graduation.hiredhub.repository.EmployerRepository;
import com.graduation.hiredhub.repository.JobSeekerRepository;
import com.graduation.hiredhub.repository.PostingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationService {
    ApplicationRepository applicationRepository;
    ApplicationMapper applicationMapper;
    PostingRepository postingRepository;
    CVRepository cvRepository;
    CVService cvService;
    JobSeekerRepository jobSeekerRepository;
    AccountService accountService;

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse createApplication(ApplicationRequest applicationRequest,String postingId, String cvId){
        Posting posting = postingRepository.findById(postingId)
                .orElseThrow(() -> new AppException(ErrorCode.POSTING_NOT_EXISTED));
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        if (!cv.getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())){
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        applicationRepository.findByPostingAndCv(posting, cv)
                .ifPresent((application) -> {
                    throw new AppException(ErrorCode.APPLICATION_ALREADY_EXISTS);
                });
        Application application = new Application();
        application.setPosting(posting);
        application.setStatus(ApplicationStatus.PENDING);
        application.setMessage(applicationRequest.getMessage());
        application.setCreatedAt(Instant.now());
        application.setUpdatedAt(Instant.now());
        application.setCv(cv);
        try {
            applicationRepository.save(application);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return applicationMapper.toApplicationResponse(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse deleteApplication(Integer applicationId){
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED));
        if (!application.getCv().getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())){
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        try {
            applicationRepository.delete(application);
        }catch (Exception e){
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return applicationMapper.toApplicationResponse(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public List<ApplicationResponse> getApplicationByCVId(String cvId){
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        if (!cv.getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())){
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        List<Application> applications = applicationRepository.findByCv(cv);
        return applications.stream()
                .map(applicationMapper::toApplicationResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get applications in posting of employer
     * Only employer posting can be seen applications in post
     *
     * @param postingId
     * @param page
     * @param size
     * @return
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PageResponse<ApplicationDTO> getApplicationsByEmployer(String postingId, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1,size);
        var pageData = applicationRepository.findByPostingId(postingId, pageable);
        return PageResponse.<ApplicationDTO>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(applicationMapper::toApplicationDTO).toList())
                .build();
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public List<ApplicationResponse> getApplicationsByJobSeeker(){
        List<CV> cvs = cvRepository.findByJobSeeker(cvService.getJobSeekerByAccount());
        List<Application> applications = new ArrayList<Application>();
        for (CV cv: cvs){
            applications.addAll(applicationRepository.findByCv(cv));
        }
        return applications.stream()
                .map(applicationMapper::toApplicationResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get application detail in posting of employer
     * Only employer posting can be seen application detail in post
     *
     * @param postingId
     * @param applicationId
     * @return applications
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO getApplicationByEmployer(String postingId, Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        if(!application.getPosting().getId().equals(postingId))
            throw new AppException(ErrorCode.APPLICATION_NOT_EXISTED);

        return applicationMapper.toApplicationDTO(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse getApplicationByJobSeeker(Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        if (!application.getCv().getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())){
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        return applicationMapper.toApplicationResponse(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse getApplicationByJobSeekerInPosting(String postingId) {
        Posting posting = postingRepository.findById(postingId)
                .orElseThrow(() -> new AppException(ErrorCode.POSTING_NOT_EXISTED));
        List<CV> cvs = cvRepository.findByJobSeeker(getJobSeekerByAccount());
        Application application = new Application();
        for (CV cv : cvs) {
            Optional<Application> optionalApplication = applicationRepository.findByPostingAndCv(posting, cv);
            if (optionalApplication.isPresent()) {
                application = optionalApplication.get();
                break; // Thoát khỏi vòng lặp sau khi tìm thấy application đầu tiên
            }
        }
        if (application.getId() == null) {
            throw new AppException(ErrorCode.APPLICATION_NOT_EXISTED);
        }
        return applicationMapper.toApplicationResponse(application);
    }

    /**
     * Update application -> review and comment for cv of user
     * Only employer posting can be review and cmt applications in post
     *
     * @param postingId
     * @param applicationId
     * @param applicationDTO
     * @return application is reviewed
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO updateApplication(String postingId, Integer applicationId, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        applicationMapper.updateApplication(application, applicationDTO);
        return applicationMapper.toApplicationDTO(applicationRepository.save(application));
    }


    JobSeeker getJobSeekerByAccount(){
        return jobSeekerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));   
    }
}
