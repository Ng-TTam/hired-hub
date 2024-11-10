package com.graduation.hiredhub.dto.reqResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobCategoryDTO {
    Integer id;
    String name;
    String description;
}
