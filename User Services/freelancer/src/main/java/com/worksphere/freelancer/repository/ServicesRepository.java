package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services, Integer> {

    List<Services> findByIsActiveTrue();
}
