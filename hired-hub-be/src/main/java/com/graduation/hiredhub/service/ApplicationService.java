package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.request.ApplicationRequest;
import com.graduation.hiredhub.dto.request.ApplicationStatusRequest;
import com.graduation.hiredhub.dto.response.ApplicationResponse;
import com.graduation.hiredhub.dto.response.ApplicationStatisticsResponse;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.*;
import com.graduation.hiredhub.entity.enumeration.ApplicationStatus;
import com.graduation.hiredhub.entity.enumeration.Status;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.ApplicationMapper;
import com.graduation.hiredhub.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationService {
    ApplicationRepository applicationRepository;
    PostingRepository postingRepository;
    EmployerRepository employerRepository;
    CVRepository cvRepository;
    JobSeekerRepository jobSeekerRepository;
    ApplicationMapper applicationMapper;
    CVService cvService;
    AccountService accountService;
    NotificationService notificationService;
    UserPreferenceService userPreferenceService;

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse createApplication(ApplicationRequest applicationRequest, String postingId, String cvId) {
        Posting posting = postingRepository.findById(postingId)
                .orElseThrow(() -> new AppException(ErrorCode.POSTING_NOT_EXISTED));
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        if (!cv.getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        applicationRepository.findByPostingAndCv(posting, cv)
                .ifPresent(application -> {
                    throw new AppException(ErrorCode.APPLICATION_ALREADY_EXISTS);
                });

        Application application = Application.builder()
                .posting(posting)
                .status(ApplicationStatus.PENDING)
                .message(applicationRequest.getMessage())
                .cv(cv)
                .build();
        try {
            applicationRepository.save(application);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        notificationService.onNewCandidate(application);

        userPreferenceService.updatePreferences(cv.getJobSeeker(), posting.getMainJob().getName(),
                posting.getPosition().getName(), posting.getEmployer().getCompany().getId(), "apply");

        return applicationMapper.toApplicationResponse(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponse deleteApplication(Integer applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED));
        if (!application.getCv().getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        try {
            applicationRepository.delete(application);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
        return applicationMapper.toApplicationResponse(application);
    }

    @PreAuthorize("hasRole('JOB_SEEKER')")
    public List<ApplicationResponse> getApplicationByCVId(String cvId) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new AppException(ErrorCode.CV_NOT_FOUND));
        if (!cv.getJobSeeker().getId().equals(cvService.getJobSeekerByAccount().getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED_ACCESS);
        }
        List<Application> applications = applicationRepository.findByCv(cv);
        return applications.stream()
                .map(applicationMapper::toApplicationResponse)
                .toList();
    }

    /**
     * Get applications in posting of employer
     * Only employer posting can be seen applications in post
     *
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PageResponse<ApplicationDTO> getApplicationsByEmployer(String postingId, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
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
    public List<ApplicationResponse> getApplicationsByJobSeeker() {
        List<CV> cvs = cvRepository.findByJobSeeker(cvService.getJobSeekerByAccount());
        List<Application> applications = new ArrayList<>();
        for (CV cv : cvs) {
            applications.addAll(applicationRepository.findByCv(cv));
        }
        return applications.stream()
                .map(applicationMapper::toApplicationResponse)
                .toList();
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public List<ApplicationResponse> getApplicationsByEmployer() {
        List<Posting> postings = postingRepository.findByEmployerId(getEmployerByAccount().getId());
        List<Application> applications = new ArrayList<>();
        for (Posting posting : postings) {
            applications.addAll(applicationRepository.findByPosting(posting));
        }
        List<ApplicationResponse> applicationResponses = new ArrayList<>();
        for (Application application : applications) {
            String email = application.getCv().getJobSeeker().getAccount().getEmail();
            ApplicationResponse applicationResponse = applicationMapper.toApplicationResponse(application);
            applicationResponse.setEmail(email);
            applicationResponse.setCvUpdateAt(application.getCv().getUpdatedAt());
            applicationResponses.add(applicationResponse);
        }
        return applicationResponses;
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public ApplicationStatisticsResponse getApplicationStatistics() {
        List<Posting> postings = postingRepository.findByEmployerId(getEmployerByAccount().getId());
        List<Application> applications = new ArrayList<>();

        int postingActive = 0;
        for (Posting posting : postings) {
            applications.addAll(applicationRepository.findByPosting(posting));
            if (posting.getStatus() != null && posting.getStatus().toString().equals(Status.ACTIVATE.toString())) {
                postingActive++;
            }
        }
        Integer postingCount = postingActive;
        Integer cVPending = 0;
        Integer cVDeactive = 0;
        Integer cVActive = 0;

        for (Application application : applications) {
            if (application.getStatus().toString().equals(ApplicationStatus.APPROVED.toString())) {
                cVActive++;
            } else if (application.getStatus().toString().equals(ApplicationStatus.REJECTED.toString())) {
                cVDeactive++;
            } else {
                cVPending++;
            }
        }
        return ApplicationStatisticsResponse.builder()
                .postingCount(postingCount)
                .cVActive(cVActive)
                .cVDeactive(cVDeactive)
                .cVPending(cVPending)
                .build();
    }

    /**
     * Get application detail in posting of employer
     * Only employer posting can be seen application detail in post
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO getApplicationByEmployer(String postingId, Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        if (!application.getPosting().getId().equals(postingId))
            throw new AppException(ErrorCode.APPLICATION_NOT_EXISTED);

        return applicationMapper.toApplicationDTO(application);
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    public ApplicationResponse getApplicationByJobSeeker(Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        ApplicationResponse applicationResponse = applicationMapper.toApplicationResponse(application);
        applicationResponse.setEmail(application.getCv().getJobSeeker().getAccount().getEmail());
        return applicationResponse;
    }


    @PreAuthorize("hasRole('EMPLOYER')")
    public ApplicationResponse setApplicationStatus(ApplicationStatusRequest applicationStatusRequest, Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        if (applicationStatusRequest.getApplicationStatus().equals("APPROVED")) {
            application.setStatus(ApplicationStatus.APPROVED);
        } else if (applicationStatusRequest.getApplicationStatus().equals("REJECTED")) {
            application.setStatus(ApplicationStatus.REJECTED);
        } else application.setStatus(ApplicationStatus.PENDING);
        try {
            applicationRepository.save(application);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }

        notificationService.onApplicationStatusChange(application);

        ApplicationResponse applicationResponse = applicationMapper.toApplicationResponse(application);
        applicationResponse.setEmail(application.getCv().getJobSeeker().getAccount().getEmail());
        return applicationResponse;
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
     * @return application is reviewed
     */
    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO updateApplication(String postingId, Integer applicationId, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        applicationMapper.updateApplication(application, applicationDTO);
        applicationRepository.save(application);

        notificationService.onCandidateUpdateApplication(application);

        return applicationMapper.toApplicationDTO(application);
    }


    JobSeeker getJobSeekerByAccount() {
        return jobSeekerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }

    Employer getEmployerByAccount() {
        return employerRepository.findByAccountId(accountService.getAccountInContext().getId())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
    }
}
