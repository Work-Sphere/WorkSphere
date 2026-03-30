package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.dto.UserServiceViewDto;
import com.worksphere.dashboardapi.service.UserServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client/user-services")
@CrossOrigin(origins = "http://localhost:5173")
public class UserServiceController {

    @Autowired
    private UserServiceService userServiceService;

    @GetMapping
    public List<UserServiceViewDto> getUserServices(@RequestParam("clientId") int clientId) {
        return userServiceService.getAcceptedUserServicesForClient(clientId);
    }

}
