package com.worksphere.freelancer.repository;

import com.worksphere.freelancer.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    // ✅ All ratings received by a freelancer
    List<Rating> findByToUser_Uid(Integer freelancerId);

    // ✅ Ratings for a freelancer for a specific service
    List<Rating> findByToUser_UidAndService_ServiceId(
            Integer freelancerId,
            Integer serviceId
    );

    // ✅ Average rating for a freelancer's service
    @Query("""
        SELECT AVG(r.rating)
        FROM Rating r
        WHERE r.toUser.uid = :freelancerId
          AND r.service.serviceId = :serviceId
    """)
    Double getAverageRating(
            @Param("freelancerId") Integer freelancerId,
            @Param("serviceId") Integer serviceId
    );
}
