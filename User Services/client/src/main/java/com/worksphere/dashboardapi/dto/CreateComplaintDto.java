package com.worksphere.dashboardapi.dto;

public class CreateComplaintDto {

    private int fromUserId;
    private int userServiceId;   // ✅ NEW
    private String description;

    public int getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(int fromUserId) {
        this.fromUserId = fromUserId;
    }

    public int getUserServiceId() {
        return userServiceId;
    }

    public void setUserServiceId(int userServiceId) {
        this.userServiceId = userServiceId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
