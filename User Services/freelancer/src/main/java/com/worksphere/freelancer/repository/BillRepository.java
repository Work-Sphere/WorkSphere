package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    boolean existsByRequirement_RequirementId(Integer requirementId);

    java.util.Optional<Bill> findByRequirement_RequirementId(Integer requirementId);

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.freelancerId = :uid
    """)
    BigDecimal getTotalEarnings(@Param("uid") Integer userId);

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.freelancerId = :uid
          AND b.paymentStatus = 'PAID'
    """)
    BigDecimal getPaidEarnings(@Param("uid") Integer userId);

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.freelancerId = :uid
          AND b.paymentStatus = 'PENDING'
    """)
    BigDecimal getPendingEarnings(@Param("uid") Integer userId);
}
