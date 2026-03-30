package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByFromUserId(int fromUserId);
}


