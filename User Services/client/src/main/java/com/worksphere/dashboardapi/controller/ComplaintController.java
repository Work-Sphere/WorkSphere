package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.CreateComplaintDto;
import com.worksphere.dashboardapi.entity.Complaint;
import com.worksphere.dashboardapi.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Get all complaints raised by a specific client
    @GetMapping
    public List<Complaint> getComplaints(@RequestParam("fromUserId") int fromUserId) {
        return complaintService.getComplaintsByUser(fromUserId);
    }

    // Create new complaint
    // Body must contain: fromUserId, toUserId, serviceId, description
    @PostMapping
    public Complaint createComplaint(@RequestBody CreateComplaintDto dto) {
        return complaintService.createComplaint(dto);
    }

    // Resolve complaint (only creator/client can resolve)
    @PutMapping("/{complaintId}/resolve")
    public Complaint resolveComplaint(
            @PathVariable("complaintId") int complaintId,
            @RequestParam("fromUserId") int fromUserId) {
        return complaintService.resolveComplaint(complaintId, fromUserId);
    }
}
