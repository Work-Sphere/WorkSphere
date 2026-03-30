package com.worksphere.freelancer.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillDTO {

    private Integer billId;

    private Integer serviceId;
    private String serviceName;

    private BigDecimal amount;
    private BigDecimal tax;
    private BigDecimal totalAmount;
    private String transactionId;


    private String paymentMode;
    private String paymentStatus;
    private LocalDate billDate;
    private LocalDate paidDate;
}
