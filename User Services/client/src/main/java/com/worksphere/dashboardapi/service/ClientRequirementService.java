package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.CreateRequirementDto;
import com.worksphere.dashboardapi.entity.Requirement;
import com.worksphere.dashboardapi.entity.RequirementRequest;
import com.worksphere.dashboardapi.repository.AcceptedRequestView;
import com.worksphere.dashboardapi.repository.RequirementRepository;
import com.worksphere.dashboardapi.repository.RequirementRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClientRequirementService {

    @Autowired
    private RequirementRepository requirementRepository;

    // ✅ THIS WAS MISSING — CRITICAL
    @Autowired
    private RequirementRequestRepository requestRepository;

    // =========================
    // GET CLIENT REQUIREMENTS
    // =========================
    public List<Requirement> getClientRequirements(int clientId) {
        return requirementRepository.findByClientId(clientId);
    }

    // =========================
    // CREATE REQUIREMENT
    // =========================
    public Requirement createRequirement(CreateRequirementDto dto) {

        Requirement req = new Requirement();
        req.setClientId(dto.getClientId());
        req.setServiceId(dto.getServiceId());
        req.setDescription(dto.getDescription());
        req.setCreatedDate(LocalDate.now());
        req.setStatus("OPEN");
        req.setDeadline(dto.getDeadline());
        req.setExperience(dto.getExperience());
        req.setBudget(dto.getBudget());

        

        return requirementRepository.save(req);
    }

    // =========================
    // ACCEPT REQUEST
    // =========================
    @Transactional
    public void acceptRequest(int requestId) {

        RequirementRequest accepted =
                requestRepository.findById(requestId)
                        .orElseThrow(() -> new RuntimeException("Request not found"));

        int requirementId = accepted.getRequirementId();

        // accept selected
        accepted.setStatus("ACCEPTED");
        requestRepository.save(accepted);

        // reject others
        List<RequirementRequest> allRequests =
                requestRepository.findByRequirementId(requirementId);

        for (RequirementRequest r : allRequests) {
            if (r.getRequestId() != requestId) {
                r.setStatus("REJECTED");
                requestRepository.save(r);
            }
        }

        // activate requirement
        Requirement req =
                requirementRepository.findById(requirementId)
                        .orElseThrow(() -> new RuntimeException("Requirement not found"));

        req.setStatus("ACTIVE");
        requirementRepository.save(req);
    }

    // =========================
    // REJECT REQUEST
    // =========================
    public void rejectRequest(int requestId) {

        RequirementRequest req =
                requestRepository.findById(requestId)
                        .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("REJECTED");
        requestRepository.save(req);
    }
    
    public List<RequirementRequest> getAcceptedRequestsForClient(int clientId) {

        List<Requirement> requirements =
                requirementRepository.findByClientId(clientId);

        List<RequirementRequest> acceptedRequests = new ArrayList<>();

        for (Requirement r : requirements) {
            if ("ACTIVE".equals(r.getStatus())) {
                requestRepository
                    .findByRequirementId(r.getRequirementId())
                    .stream()
                    .filter(req -> "ACCEPTED".equals(req.getStatus()))
                    .findFirst()
                    .ifPresent(acceptedRequests::add);
            }
        }

        return acceptedRequests;
    }
    
    public List<com.worksphere.dashboardapi.dto.AcceptedProjectDto> getAcceptedProjects(int clientId) {
        return requirementRepository.findAcceptedProjects(clientId);
    }

    public List<AcceptedRequestView> getRequestsForRequirement(int requirementId) {
        return requestRepository.findRequestsWithFreelancerName(requirementId);
    }


}
