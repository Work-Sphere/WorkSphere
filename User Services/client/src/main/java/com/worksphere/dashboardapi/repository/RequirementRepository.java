package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.dto.AcceptedProjectDto;
import com.worksphere.dashboardapi.entity.Requirement;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequirementRepository extends JpaRepository<Requirement, Integer> {

    long countByClientId(int clientId);

    long countByClientIdAndStatus(int clientId, String status);
    
    List<Requirement> findByClientId(int clientId); 
    
    @Query("""
            SELECT new com.worksphere.dashboardapi.dto.AcceptedProjectDto(
                r.requirementId,
                r.description,
                rr.freelancerId,
                r.serviceId
            )
            FROM Requirement r
            JOIN RequirementRequest rr
                ON rr.requirementId = r.requirementId
            WHERE r.clientId = :clientId
              AND rr.status = 'ACCEPTED'
        """)
        List<AcceptedProjectDto> findAcceptedProjects(@Param("clientId") int clientId);
    
}
