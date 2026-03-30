package com.worksphere.freelancer.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserServiceDTO {

    private Integer userServiceId;

    private Integer serviceId;
    private String serviceName;

    private BigDecimal customPrice;
    private String experience;
    private String details;

    // FIX: Boolean ❌ → Integer ✅
    private Integer status;
}
