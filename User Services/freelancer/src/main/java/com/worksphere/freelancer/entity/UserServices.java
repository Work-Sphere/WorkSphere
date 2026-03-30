package com.worksphere.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "user_services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserServices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_service_id")
    private Integer userServiceId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services service;

    @Column(name = "custom_price")
    private BigDecimal customPrice;

    @Column(name = "experience")
    private String experience;

    @Column(name = "details")
    private String details;

    // ✅ FIX: BIT → Boolean
    @Column(name = "status")
    private Boolean status;
}
