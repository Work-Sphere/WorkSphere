package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
	List<Complaint> findByFromUserId(int fromUserId);

}
