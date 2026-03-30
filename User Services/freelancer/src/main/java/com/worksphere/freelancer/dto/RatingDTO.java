package com.worksphere.freelancer.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingDTO {

    private Integer ratingId;

    private Integer fromUserId;
    private String fromUserName;

    private Integer serviceId;
    private String serviceName;

    private Integer rating;
    private String review;
    private LocalDate ratingDate;
}
