package com.worksphere.freelancer.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerApplicationDTO {

    private Integer requestId;
    private Integer requirementId;

    private Integer serviceId;
    private String serviceName;

    private String requirementStatus;
    private String applicationStatus;
    private LocalDate appliedDate;
    private LocalDate deadline;
    private java.math.BigDecimal budget;

    private String billStatus; // PENDING, PAID, or null
    private Integer billId;

}
