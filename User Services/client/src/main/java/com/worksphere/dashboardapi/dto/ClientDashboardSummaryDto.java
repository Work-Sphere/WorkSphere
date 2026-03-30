package com.worksphere.dashboardapi.dto;

public class ClientDashboardSummaryDto {

    private long totalRequirements;
    private long activeProjects;
    private long pendingRequests;
    private double totalAmountPaid;

    public ClientDashboardSummaryDto(long totalRequirements,
                                     long activeProjects,
                                     long pendingRequests,
                                     double totalAmountPaid) {
        this.totalRequirements = totalRequirements;
        this.activeProjects = activeProjects;
        this.pendingRequests = pendingRequests;
        this.totalAmountPaid = totalAmountPaid;
    }

    public long getTotalRequirements() {
        return totalRequirements;
    }

    public long getActiveProjects() {
        return activeProjects;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }

    public double getTotalAmountPaid() {
        return totalAmountPaid;
    }
}
