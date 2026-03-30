package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByPhone(String phone); // ✅ REQUIRED
}
