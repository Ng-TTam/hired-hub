package com.graduation.hiredhub.service;

import com.graduation.hiredhub.dto.reqResp.ApplicationDTO;
import com.graduation.hiredhub.dto.response.PageResponse;
import com.graduation.hiredhub.entity.Application;
import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import com.graduation.hiredhub.mapper.ApplicationMapper;
import com.graduation.hiredhub.repository.ApplicationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationService {
    ApplicationRepository applicationRepository;
    ApplicationMapper applicationMapper;

    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public PageResponse<ApplicationDTO> getApplications(String postingId, int page, int size) {
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

    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO getApplication(String postingId, Integer applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );

        if(!application.getPosting().getId().equals(postingId))
            throw new AppException(ErrorCode.APPLICATION_NOT_EXISTED);

        return applicationMapper.toApplicationDTO(application);
    }

    @PreAuthorize("@postingSecurity.isPostingOwner(#postingId,  authentication.name)")
    public ApplicationDTO updateApplication(String postingId, Integer applicationId, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new AppException(ErrorCode.APPLICATION_NOT_EXISTED)
        );
        applicationMapper.updateApplication(application, applicationDTO);
        return applicationMapper.toApplicationDTO(applicationRepository.save(application));
    }
}
