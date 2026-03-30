package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.Complaints;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintsRepository extends JpaRepository<Complaints, Integer> {

    List<Complaints> findByToUser_Uid(Integer freelancerId);

    List<Complaints> findByToUser_UidAndStatus(Integer freelancerId, String status);
}
