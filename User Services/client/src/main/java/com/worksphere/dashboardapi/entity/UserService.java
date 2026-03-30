package com.worksphere.dashboardapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_services")
public class UserService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_service_id")
    private int userServiceId;

    @Column(name = "user_id")
    private int userId;          // freelancer id

    @Column(name = "service_id")
    private int serviceId;

	public int getUserServiceId() {
		return userServiceId;
	}

	public void setUserServiceId(int userServiceId) {
		this.userServiceId = userServiceId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

    
}
