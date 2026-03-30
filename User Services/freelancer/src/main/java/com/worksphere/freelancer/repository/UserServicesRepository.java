package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.UserServices;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserServicesRepository extends JpaRepository<UserServices, Integer> {

    List<UserServices> findByUser_Uid(Integer userId);

    Optional<UserServices> findByUser_UidAndService_ServiceId(Integer userId, Integer serviceId);

    List<UserServices> findByUser_UidAndStatusTrue(Integer userId);
}
