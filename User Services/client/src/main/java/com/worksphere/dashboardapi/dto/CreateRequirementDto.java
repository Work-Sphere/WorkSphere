package com.worksphere.dashboardapi.dto;

import java.time.LocalDate;

public class CreateRequirementDto {

    private int clientId;
    private int serviceId;
    private String description;

    /* 🔹 NEW FIELDS */
    private LocalDate deadline;
    private String experience;
    private Double budget;

    public int getClientId() { return clientId; }
    public void setClientId(int clientId) { this.clientId = clientId; }

    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }
}
