package com.worksphere.freelancer.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class GenerateBillDTO {
    private Integer requirementId;
    private Integer serviceId;
    private BigDecimal amount;
    private BigDecimal tax;
}
