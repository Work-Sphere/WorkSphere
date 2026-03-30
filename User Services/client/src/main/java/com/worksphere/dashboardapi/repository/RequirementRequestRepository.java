package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.RequirementRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequirementRequestRepository
    extends JpaRepository<RequirementRequest, Integer> {

  @Query("""
          SELECT COUNT(rr)
          FROM RequirementRequest rr
          JOIN Requirement r
          ON rr.requirementId = r.requirementId
          WHERE r.clientId = :clientId
            AND rr.status = 'PENDING'
      """)
  long countPendingRequestsByClientId(@Param("clientId") int clientId);

  List<RequirementRequest> findByRequirementId(int requirementId);

  @Query("""
          SELECT
            rr.requestId as requestId,
            rr.requirementId as requirementId,
            rr.freelancerId as freelancerId,
            CONCAT(u.fname, ' ', u.lname) as freelancerName,
            s.service_name as serviceName,
            rr.status as status,
            b.paymentStatus as billStatus,
            b.billId as billId
          FROM RequirementRequest rr
          JOIN User u ON rr.freelancerId = u.uid
          JOIN Requirement req ON rr.requirementId = req.requirementId
          JOIN Services s ON req.serviceId = s.service_id
          LEFT JOIN Bill b ON rr.requirementId = b.requirement.requirementId
          WHERE rr.requirementId = :requirementId
      """)
  List<AcceptedRequestView> findRequestsWithFreelancerName(@Param("requirementId") int requirementId);

}
