package com.worksphere.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "requirement_request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private Requirement requirement;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private User freelancer;

    @Column(name = "request_date")
    private LocalDate requestDate;

    @Column(name = "status")
    private String status;
}
