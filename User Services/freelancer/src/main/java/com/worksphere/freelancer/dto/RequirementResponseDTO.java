package com.worksphere.freelancer.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequirementResponseDTO {

    private Integer requirementId;
    private Integer clientId;
    private String clientName;

    private Integer serviceId;
    private String serviceName;

    private String description;
    private BigDecimal budget;
    private Integer experience;
    private LocalDate deadline;
    private String status;
}
