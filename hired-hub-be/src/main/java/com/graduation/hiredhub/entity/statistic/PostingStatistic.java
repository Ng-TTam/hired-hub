package com.graduation.hiredhub.entity.statistic;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostingStatistic {
    Long viewedQuantity;
    Long followedQuantity;
    Long appliedQuantity;
    Long rejectedQuantity;
    Long approvedQuantity;
}
