package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.AcceptedProjectDto;
import com.worksphere.dashboardapi.repository.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcceptedProjectService {

    @Autowired
    private RequirementRepository requirementRepository;

    public List<AcceptedProjectDto> getAcceptedProjects(int clientId) {
        return requirementRepository.findAcceptedProjects(clientId);
    }
}
