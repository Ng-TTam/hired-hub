package com.graduation.hiredhub.dto.request;

import com.graduation.hiredhub.entity.enumeration.Status;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminPostingFilterCriteria {
    String searchValue;
    Integer provinceId;
    Integer jobCategoryId;
    Status status;
}
