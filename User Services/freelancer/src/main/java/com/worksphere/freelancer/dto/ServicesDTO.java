package com.worksphere.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicesDTO {

    private Integer serviceId;
    private String serviceName;
    private String description;
    private Boolean isActive;
}
