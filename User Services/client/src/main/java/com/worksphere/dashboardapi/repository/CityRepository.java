package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findByState_StateId(Integer stateId);
}
