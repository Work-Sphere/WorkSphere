package com.worksphere.dashboardapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksphere.dashboardapi.entity.Services;

public interface ServicesRepository extends JpaRepository<Services, Integer> {
}

