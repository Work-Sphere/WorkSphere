package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "requirement")
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requirement_id")
    private int requirementId;

    @Column(name = "client_id")
    private int clientId;

    @Column(name = "service_id")
    private int serviceId;

    private String description;

    @Column(name = "created_date")
    private LocalDate createdDate;

    private String status;

    // ===== NEW COLUMNS =====

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "experience")
    private String experience;

    @Column(name = "budget")
    private Double budget;

    // ===== GETTERS & SETTERS =====

    public int getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // ===== NEW GETTERS & SETTERS =====

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }
}
