package com.graduation.hiredhub.entity.statistic;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostingStatistic {
    private Long viewedQuantity;
    private Long followedQuantity;
    private Long appliedQuantity;
    private Long rejectedQuantity;
    private Long approvedQuantity;
}
