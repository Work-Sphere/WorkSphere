package com.worksphere.dashboardapi.dto;

public class UserServiceViewDto {

    private int userServiceId;
    private int freelancerId;
    private String freelancerName;
    private int serviceId;
    private String serviceName;
    private double customPrice;

    public UserServiceViewDto(int userServiceId,
                              int freelancerId,
                              String freelancerName,
                              int serviceId,
                              String serviceName,
                              double customPrice) {
        this.userServiceId = userServiceId;
        this.freelancerId = freelancerId;
        this.freelancerName = freelancerName;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.customPrice = customPrice;
    }

    public int getUserServiceId() { return userServiceId; }
    public int getFreelancerId() { return freelancerId; }
    public String getFreelancerName() { return freelancerName; }
    public int getServiceId() { return serviceId; }
    public String getServiceName() { return serviceName; }
    public double getCustomPrice() { return customPrice; }
}
