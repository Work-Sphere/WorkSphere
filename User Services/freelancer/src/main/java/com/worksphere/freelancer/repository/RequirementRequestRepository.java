package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.RequirementRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequirementRequestRepository
        extends JpaRepository<RequirementRequest, Integer> {

    boolean existsByFreelancer_UidAndRequirement_RequirementId(
            Integer freelancerId,
            Integer requirementId
    );

    List<RequirementRequest> findByFreelancer_Uid(Integer freelancerId);
}
