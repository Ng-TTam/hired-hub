package com.graduation.hiredhub.dto.reqResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScaleCategoryDTO {
    Integer id;
    String name;
    Integer minEmployee;
    Integer maxEmployee;
}
