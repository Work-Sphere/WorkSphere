package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State, Integer> {
}
