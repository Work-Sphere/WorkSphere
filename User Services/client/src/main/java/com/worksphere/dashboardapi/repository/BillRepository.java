package com.worksphere.dashboardapi.repository;

import com.worksphere.dashboardapi.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    List<Bill> findByUserId(int userId);

    List<Bill> findByUserIdAndPaymentStatus(int userId, String paymentStatus);

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.userId = :clientId AND b.paymentStatus = 'PAID'
    """)
    double getTotalAmountPaid(@Param("clientId") int clientId);
}
