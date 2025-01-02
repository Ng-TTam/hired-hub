package com.graduation.hiredhub.dto.response;

import com.graduation.hiredhub.dto.reqResp.PositionCategoryDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployerResponse extends UserResponse {
    CompanyResponse company;
    PositionCategoryDTO position;
}
