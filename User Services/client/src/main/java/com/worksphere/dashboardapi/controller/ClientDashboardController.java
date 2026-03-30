package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.ClientDashboardSummaryDto;
import com.worksphere.dashboardapi.dto.UserProfileDTO;
import com.worksphere.dashboardapi.entity.State;
import com.worksphere.dashboardapi.entity.City;
import com.worksphere.dashboardapi.service.ClientDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/client/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientDashboardController {

    @Autowired
    private ClientDashboardService dashboardService;

    @GetMapping("/summary")
    public ClientDashboardSummaryDto getSummary(
            @RequestParam("clientId") int clientId) {
        return dashboardService.getDashboardSummary(clientId);
    }

    @GetMapping("/profile")
    public UserProfileDTO getMyProfile(
            @RequestParam("clientId") int clientId) {
        return dashboardService.getMyProfile(clientId);
    }

    @PutMapping("/profile")
    public void updateMyProfile(
            @RequestParam("clientId") int clientId,
            @RequestBody UserProfileDTO dto) {
        dashboardService.updateMyProfile(clientId, dto);
    }

    @GetMapping("/states")
    public List<State> getAllStates() {
        return dashboardService.getAllStates();
    }

    @GetMapping("/cities")
    public List<City> getCities(
            @RequestParam("stateId") int stateId) {
        return dashboardService.getCitiesByState(stateId);
    }
}
