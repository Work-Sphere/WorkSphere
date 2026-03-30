package com.worksphere.dashboardapi.repository;

public interface AcceptedRequestView {
    int getRequestId();
    int getRequirementId();
    int getFreelancerId();
    String getFreelancerName();
    String getServiceName();
    String getStatus();
    String getBillStatus();
    Integer getBillId();
}
