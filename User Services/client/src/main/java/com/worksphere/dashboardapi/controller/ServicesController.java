package com.worksphere.dashboardapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.worksphere.dashboardapi.entity.Services;
import com.worksphere.dashboardapi.repository.ServicesRepository;

@RestController
@RequestMapping("/api/client/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicesController {

    @Autowired
    private ServicesRepository repo;

    @GetMapping
    public List<Services> getAllServices() {
        return repo.findAll();
    }
}

