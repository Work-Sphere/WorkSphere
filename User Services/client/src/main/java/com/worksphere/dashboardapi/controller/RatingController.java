package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.CreateRatingDto;
import com.worksphere.dashboardapi.entity.Rating;
import com.worksphere.dashboardapi.service.RatingService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client/ratings")
@CrossOrigin
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public Rating submitRating(@RequestBody CreateRatingDto dto) {
        return ratingService.submitRating(dto);
    }

    @GetMapping
    public List<Rating> getRatingsByClient(@RequestParam("clientId") int clientId) {
        return ratingService.getRatingsByClient(clientId);
    }

}
