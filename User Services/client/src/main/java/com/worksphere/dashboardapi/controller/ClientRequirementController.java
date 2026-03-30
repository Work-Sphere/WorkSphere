package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.CreateRequirementDto;

import com.worksphere.dashboardapi.entity.Requirement;
import com.worksphere.dashboardapi.entity.RequirementRequest;
import com.worksphere.dashboardapi.service.ClientRequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientRequirementController {

    @Autowired
    private ClientRequirementService requirementService;

    // ✅ GET: fetch client requirements
    @GetMapping("/requirements")
    public List<Requirement> getClientRequirements(
            @RequestParam("clientId") int clientId) {
        return requirementService.getClientRequirements(clientId);
    }

    // ✅ POST: create new requirement
    @PostMapping("/requirements")
    public Requirement createRequirement(
            @RequestBody CreateRequirementDto dto) {
        return requirementService.createRequirement(dto);
    }

    @GetMapping("/requirements/{requirementId}/requests")
    public List<?> getRequests(
            @PathVariable("requirementId") int requirementId) {
        return requirementService.getRequestsForRequirement(requirementId);
    }

    @PostMapping("/requests/{requestId}/accept")
    public void acceptRequest(@PathVariable("requestId") int requestId) {
        requirementService.acceptRequest(requestId);
    }

    @PostMapping("/requests/{requestId}/reject")
    public void rejectRequest(@PathVariable("requestId") int requestId) {
        requirementService.rejectRequest(requestId);
    }

    @GetMapping("/accepted-requests")
    public List<com.worksphere.dashboardapi.entity.RequirementRequest> getAcceptedRequests(
            @RequestParam("clientId") int clientId) {
        return requirementService.getAcceptedRequestsForClient(clientId);
    }

}
