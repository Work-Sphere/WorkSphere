package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.CreateRatingDto;
import com.worksphere.dashboardapi.entity.Rating;
import com.worksphere.dashboardapi.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public Rating submitRating(CreateRatingDto dto) {

        Rating rating = new Rating();
        rating.setFromUserId(dto.getFromUserId());
        rating.setToUserId(dto.getToUserId());
        rating.setServiceId(dto.getServiceId());
        rating.setRating(dto.getRating());
        rating.setReview(dto.getReview());
        rating.setRatingDate(LocalDate.now());

        return ratingRepository.save(rating);
    }

    public List<Rating> getRatingsByClient(int clientId) {
        return ratingRepository.findByFromUserId(clientId);
    }
}
