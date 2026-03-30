package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "requirement_request")
public class RequirementRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private int requestId;

    @Column(name = "requirement_id")
    private int requirementId;

    @Column(name = "freelancer_id")
    private int freelancerId;

    private String status;

    @Column(name = "request_date")
    private LocalDate requestDate;

    // ✅ GETTERS & SETTERS

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public int getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }

    public int getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(int freelancerId) {
        this.freelancerId = freelancerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }
}
