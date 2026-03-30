package com.worksphere.freelancer.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserServiceDTO {

    private Integer userServiceId;
    private BigDecimal customPrice;
    private String experience;
    private String details;

    // FIX: Boolean ❌ → Integer ✅
    private Integer status; // 0 = inactive, 1 = active
}
