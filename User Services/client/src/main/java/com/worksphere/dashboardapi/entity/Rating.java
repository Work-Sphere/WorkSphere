package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private int ratingId;

    @Column(name = "from_user_id")
    private int fromUserId;

    @ManyToOne
    @JoinColumn(name = "to_user_id", insertable = false, updatable = false)
    private User toUser;

    @Column(name = "to_user_id")
    private int toUserId;

    @ManyToOne
    @JoinColumn(name = "service_id", insertable = false, updatable = false)
    private Services service;

    @Column(name = "service_id")
    private int serviceId;

    private int rating;
    private String review;

    @Column(name = "rating_date")
    private LocalDate ratingDate;

    // getters & setters
    public int getRatingId() { return ratingId; }
    public int getFromUserId() { return fromUserId; }
    public void setFromUserId(int fromUserId) { this.fromUserId = fromUserId; }
    
    public User getToUser() { return toUser; }
    public void setToUser(User toUser) { this.toUser = toUser; }
    
    public int getToUserId() { return toUserId; }
    public void setToUserId(int toUserId) { this.toUserId = toUserId; }
    
    public Services getService() { return service; }
    public void setService(Services service) { this.service = service; }
    
    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }
    
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
    public LocalDate getRatingDate() { return ratingDate; }
    public void setRatingDate(LocalDate ratingDate) { this.ratingDate = ratingDate; }
}
