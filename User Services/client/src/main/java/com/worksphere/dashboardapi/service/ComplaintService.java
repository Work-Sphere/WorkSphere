package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.CreateComplaintDto;
import com.worksphere.dashboardapi.entity.Complaint;
import com.worksphere.dashboardapi.entity.UserService;
import com.worksphere.dashboardapi.repository.ComplaintRepository;
import com.worksphere.dashboardapi.repository.UserServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserServiceRepository userServiceRepository; // ✅ NEW

    // complaints raised BY a user (client side)
    public List<Complaint> getComplaintsByUser(int fromUserId) {
        return complaintRepository.findByFromUserId(fromUserId);
    }

    // create complaint using user_services lookup
    public Complaint createComplaint(CreateComplaintDto dto) {

        // 1️⃣ find the freelancer+service pair from user_services table
        UserService userService = userServiceRepository
                .findById(dto.getUserServiceId())
                .orElseThrow(() -> new RuntimeException("Invalid service selection"));

        // 2️⃣ create complaint using values from that row
        Complaint c = new Complaint();
        c.setFromUserId(dto.getFromUserId());           // client who complains
        c.setToUserId(userService.getUserId());         // freelancer from user_services
        c.setServiceId(userService.getServiceId());     // service from user_services
        c.setDescription(dto.getDescription());
        c.setCreateDate(LocalDate.now());
        c.setStatus("PENDING");

        // 3️⃣ save complaint (complaint table structure unchanged)
        return complaintRepository.save(c);
    }

    // mark complaint as resolved by its creator
    public Complaint resolveComplaint(int complaintId, int fromUserId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // only the user who created the complaint can resolve it
        if (complaint.getFromUserId() != fromUserId) {
            throw new RuntimeException("Unauthorized action");
        }

        complaint.setStatus("RESOLVED");
        return complaintRepository.save(complaint);
    }
}
