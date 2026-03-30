package com.worksphere.freelancer.controller;

import com.worksphere.freelancer.dto.*;
import com.worksphere.freelancer.service.FreelancerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/freelancer")
@CrossOrigin(origins = "http://localhost:5173")
public class FreelancerController {

    private final FreelancerService freelancerService;

    public FreelancerController(FreelancerService freelancerService) {
        this.freelancerService = freelancerService;
    }

    @GetMapping("/test-connection")
    public org.springframework.http.ResponseEntity<String> testConnection() {
        return org.springframework.http.ResponseEntity.ok("Bill Ownership Fix Active - Explicit ID Mapping V2");
    }

    // ================= OPEN REQUIREMENTS =================
    @GetMapping("/requirements")
    public List<RequirementResponseDTO> getOpenRequirements(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getOpenRequirements(freelancerId);
    }

    // ================= APPLY REQUIREMENT =================
    @PostMapping("/apply")
    public void applyForRequirement(
            @RequestParam("freelancerId") Integer freelancerId,
            @RequestBody ApplyRequirementDTO dto) {
        freelancerService.applyForRequirement(freelancerId, dto);
    }

    // ================= PROJECTS / APPLICATIONS =================
    @GetMapping("/projects")
    public List<FreelancerApplicationDTO> getMyProjects(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyApplications(freelancerId);
    }

    // ================= SERVICES =================
    @GetMapping("/services")
    public List<UserServiceDTO> getMyServices(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyServices(freelancerId);
    }

    @PostMapping("/services")
    public void addService(
            @RequestParam("freelancerId") Integer freelancerId,
            @RequestBody AddUserServiceDTO dto) {
        freelancerService.addService(freelancerId, dto);
    }

    @PutMapping("/services/{userServiceId}")
    public void updateService(
            @RequestParam("freelancerId") Integer freelancerId,
            @PathVariable("userServiceId") Integer userServiceId,
            @RequestBody UpdateUserServiceDTO dto) {
        freelancerService.updateService(freelancerId, userServiceId, dto);
    }

    @DeleteMapping("/services/{userServiceId}")
    public void deleteService(
            @RequestParam("freelancerId") Integer freelancerId,
            @PathVariable("userServiceId") Integer userServiceId) {
        freelancerService.deleteService(freelancerId, userServiceId);
    }

    // ================= RATINGS =================
    @GetMapping("/ratings")
    public List<ServiceRatingDTO> getMyServiceRatings(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyServiceRatings(freelancerId);
    }

    @GetMapping("/ratings/{serviceId}")
    public Map<String, Object> getRatingsForService(
            @RequestParam("freelancerId") Integer freelancerId,
            @PathVariable("serviceId") Integer serviceId) {
        return freelancerService.getRatingsForService(freelancerId, serviceId);
    }

    // ================= COMPLAINTS =================
    @GetMapping("/complaints")
    public List<ComplaintResponseDTO> getMyComplaints(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyComplaints(freelancerId);
    }

    // ================= EARNINGS =================
    @GetMapping("/earnings")
    public EarningResponseDTO getMyEarnings(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyEarnings(freelancerId);
    }

    // ================= BILL =================
    @PostMapping("/bill")
    public org.springframework.http.ResponseEntity<?> generateBill(
            @RequestParam("freelancerId") Integer freelancerId,
            @RequestBody GenerateBillDTO dto) {
        try {
            freelancerService.generateBill(freelancerId, dto);
            return org.springframework.http.ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return org.springframework.http.ResponseEntity
                    .internalServerError()
                    .body(java.util.Map.of("message", e.getMessage()));
        }
    }

    // ================= ALL SERVICES (SYSTEM) =================
    @GetMapping("/services-master")
    public List<ServicesDTO> getAllServices() {
        return freelancerService.getAllServices();
    }

    // ================= PROFILE =================
    @GetMapping("/profile")
    public UserProfileDTO getMyProfile(
            @RequestParam("freelancerId") Integer freelancerId) {
        return freelancerService.getMyProfile(freelancerId);
    }

    @PutMapping("/profile")
    public void updateMyProfile(
            @RequestParam("freelancerId") Integer freelancerId,
            @RequestBody UserProfileDTO dto) {
        freelancerService.updateMyProfile(freelancerId, dto);
    }

    @GetMapping("/states")
    public java.util.List<com.worksphere.freelancer.entity.State> getAllStates() {
        return freelancerService.getAllStates();
    }

    @GetMapping("/cities")
    public java.util.List<com.worksphere.freelancer.entity.City> getCities(
            @RequestParam("stateId") Integer stateId) {
        return freelancerService.getCitiesByState(stateId);
    }
}
