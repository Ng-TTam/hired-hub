package com.graduation.hiredhub.dto.reqResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PositionCategoryDTO {
    Integer id;
    String name;
    String description;
}
