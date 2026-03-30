package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
