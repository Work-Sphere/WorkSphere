package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequirementRepository extends JpaRepository<Requirement, Integer> {

    List<Requirement> findByService_ServiceId(Integer serviceId);

    List<Requirement> findByStatus(String status);

    // ✅ CORE METHOD (DO NOT CHANGE)
    @Query("""
        SELECT r FROM Requirement r
        WHERE r.status = 'OPEN'
        AND r.requirementId NOT IN (
            SELECT rr.requirement.requirementId
            FROM RequirementRequest rr
            WHERE rr.freelancer.uid = :freelancerId
        )
    """)
    List<Requirement> findOpenRequirementsNotApplied(
            @Param("freelancerId") Integer freelancerId
    );

    @Query("SELECT r.client.uid FROM Requirement r WHERE r.requirementId = :requirementId")
    Integer findClientIdByRequirementId(@Param("requirementId") Integer requirementId);
}
