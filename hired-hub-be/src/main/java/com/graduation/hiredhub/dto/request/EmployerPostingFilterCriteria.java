package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.PostingStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerPostingFilterCriteria {
    PostingStatus status;
    String searchValue;
}
