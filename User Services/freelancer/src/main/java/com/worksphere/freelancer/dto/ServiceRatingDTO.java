package com.worksphere.freelancer.dto;

import java.util.List;

import com.worksphere.freelancer.entity.Rating;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRatingDTO {

    private Integer serviceId;
    private String serviceName;
    private Double averageRating;
    private List<Rating> ratings;

    // getters & setters
}
