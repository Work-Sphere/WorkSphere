package com.worksphere.dashboardapi.dto;

public class AcceptedProjectDto {

    private int requirementId;
    private String description;
    private int freelancerId;
    private int serviceId;

    public AcceptedProjectDto(
            int requirementId,
            String description,
            int freelancerId,
            int serviceId
    ) {
        this.requirementId = requirementId;
        this.description = description;
        this.freelancerId = freelancerId;
        this.serviceId = serviceId;
    }

    public int getRequirementId() {
        return requirementId;
    }

    public String getDescription() {
        return description;
    }

    public int getFreelancerId() {
        return freelancerId;
    }

    public int getServiceId() {
        return serviceId;
    }
}
