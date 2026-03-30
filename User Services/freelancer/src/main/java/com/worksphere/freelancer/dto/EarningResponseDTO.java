package com.worksphere.freelancer.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EarningResponseDTO {

    private BigDecimal totalEarnings;
    private BigDecimal paidEarnings;
    private BigDecimal pendingEarnings;
}
