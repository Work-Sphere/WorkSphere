package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.AcceptedProjectDto;
import com.worksphere.dashboardapi.service.AcceptedProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:5173")
public class AcceptedProjectController {

    @Autowired
    private AcceptedProjectService acceptedProjectService;

    @GetMapping("/accepted-projects")
    public List<AcceptedProjectDto> getAcceptedProjects(
            @RequestParam("clientId") int clientId) {
        return acceptedProjectService.getAcceptedProjects(clientId);
    }
}
