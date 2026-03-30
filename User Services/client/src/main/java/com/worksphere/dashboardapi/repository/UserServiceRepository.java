package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.dto.UserServiceViewDto;
import com.worksphere.dashboardapi.entity.UserService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserServiceRepository extends JpaRepository<UserService, Integer> {

	@Query(value = """
		    SELECT DISTINCT
		        us.user_service_id,
		        u.uid,
		        CONCAT(u.fname, ' ', u.lname) AS freelancerName,
		        s.service_id,
		        s.service_name,
		        us.custom_price
		    FROM requirement r
		    JOIN requirement_request rr 
		           ON rr.requirement_id = r.requirement_id
		    JOIN user_services us 
		           ON us.user_id = rr.freelancer_id
		          AND us.service_id = r.service_id
		    JOIN user u ON u.uid = rr.freelancer_id
		    JOIN services s ON s.service_id = r.service_id
		    WHERE r.client_id = :clientId
		      AND rr.status = 'ACCEPTED'
		      AND us.status = 1
		    """,
		    nativeQuery = true)
		List<Object[]> findAcceptedUserServicesForClient(@Param("clientId") int clientId);


}
