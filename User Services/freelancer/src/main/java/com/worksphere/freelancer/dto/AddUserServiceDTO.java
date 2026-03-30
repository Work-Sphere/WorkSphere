package com.worksphere.freelancer.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddUserServiceDTO {

    private Integer serviceId;
    private BigDecimal customPrice;
    private String experience;
    private String details;
}
