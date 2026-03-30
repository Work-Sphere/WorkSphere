package com.worksphere.freelancer.service;

import com.worksphere.freelancer.dto.*;
import com.worksphere.freelancer.entity.*;
import com.worksphere.freelancer.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class FreelancerService {

    private final RequirementRepository requirementRepository;
    private final RequirementRequestRepository requirementRequestRepository;
    private final UserServicesRepository userServicesRepository;
    private final RatingRepository ratingRepository;
    private final ServicesRepository servicesRepository;
    private final UserRepository userRepository;
    private final ComplaintsRepository complaintRepository;
    private final BillRepository billRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;

    public FreelancerService(
            RequirementRepository requirementRepository,
            RequirementRequestRepository requirementRequestRepository,
            UserServicesRepository userServicesRepository,
            RatingRepository ratingRepository,
            ServicesRepository servicesRepository,
            UserRepository userRepository,
            ComplaintsRepository complaintRepository,
            BillRepository billRepository,
            CityRepository cityRepository,
            StateRepository stateRepository
    ) {
        this.requirementRepository = requirementRepository;
        this.requirementRequestRepository = requirementRequestRepository;
        this.userServicesRepository = userServicesRepository;
        this.ratingRepository = ratingRepository;
        this.servicesRepository = servicesRepository;
        this.userRepository = userRepository;
        this.complaintRepository = complaintRepository;
        this.billRepository = billRepository;
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
    }

    // ================= OPEN REQUIREMENTS =================
    public List<RequirementResponseDTO> getOpenRequirements(Integer freelancerId) {
        return requirementRepository
                .findOpenRequirementsNotApplied(freelancerId)
                .stream()
                .map(r -> new RequirementResponseDTO(
                        r.getRequirementId(),
                        r.getClient().getUid(),
                        r.getClient().getFname() + " " + r.getClient().getLname(),
                        r.getService().getServiceId(),
                        r.getService().getServiceName(),
                        r.getDescription(),
                        r.getBudget(),
                        r.getExperience(),
                        r.getDeadline(),
                        r.getStatus()
                ))
                .toList();
    }

    // ================= APPLY REQUIREMENT =================
    public void applyForRequirement(Integer freelancerId, ApplyRequirementDTO dto) {

        if (requirementRequestRepository
                .existsByFreelancer_UidAndRequirement_RequirementId(
                        freelancerId, dto.getRequirementId())) {
            throw new RuntimeException("Already applied");
        }

        Requirement requirement = requirementRepository.findById(dto.getRequirementId())
                .orElseThrow(() -> new RuntimeException("Requirement not found"));

        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequirementRequest req = new RequirementRequest();
        req.setFreelancer(freelancer);
        req.setRequirement(requirement);
        req.setStatus("APPLIED");
        req.setRequestDate(LocalDate.now());

        requirementRequestRepository.save(req);
    }

    // ================= MY APPLICATIONS =================
    public List<FreelancerApplicationDTO> getMyApplications(Integer freelancerId) {
        return requirementRequestRepository.findByFreelancer_Uid(freelancerId)
                .stream()
                .map(req -> {
                    Requirement r = req.getRequirement();
                    Optional<Bill> billOpt = billRepository.findByRequirement_RequirementId(r.getRequirementId());
                    
                    return new FreelancerApplicationDTO(
                            req.getRequestId(),
                            r.getRequirementId(),
                            r.getService().getServiceId(),
                            r.getService().getServiceName(),
                            r.getStatus(),
                            req.getStatus(),
                            req.getRequestDate(),
                            r.getDeadline(),
                            r.getBudget(),
                            billOpt.map(Bill::getPaymentStatus).orElse(null),
                            billOpt.map(Bill::getBillId).orElse(null)
                    );
                })
                .toList();
    }

    // ================= MY SERVICES =================
    public List<UserServiceDTO> getMyServices(Integer freelancerId) {
        return userServicesRepository.findByUser_Uid(freelancerId)
                .stream()
                .map(us -> new UserServiceDTO(
                        us.getUserServiceId(),
                        us.getService().getServiceId(),
                        us.getService().getServiceName(),
                        us.getCustomPrice(),
                        us.getExperience(),
                        us.getDetails(),
                        us.getStatus() != null && us.getStatus() ? 1 : 0
                ))
                .toList();
    }

    // ================= ADD SERVICE =================
    public void addService(Integer freelancerId, AddUserServiceDTO dto) {

        User user = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Services service = servicesRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        UserServices us = new UserServices();
        us.setUser(user);
        us.setService(service);
        us.setCustomPrice(dto.getCustomPrice());
        us.setExperience(dto.getExperience());
        us.setDetails(dto.getDetails());
        us.setStatus(true);

        userServicesRepository.save(us);
    }

    // ================= UPDATE SERVICE =================
    public void updateService(Integer freelancerId, Integer userServiceId, UpdateUserServiceDTO dto) {

        UserServices us = userServicesRepository.findById(userServiceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (!us.getUser().getUid().equals(freelancerId)) {
            throw new RuntimeException("Unauthorized");
        }

        us.setCustomPrice(dto.getCustomPrice());
        us.setExperience(dto.getExperience());
        us.setDetails(dto.getDetails());

        if (dto.getStatus() != null) {
            us.setStatus(dto.getStatus() == 1);
        }

        userServicesRepository.save(us);
    }

    // ================= DELETE SERVICE =================
    public void deleteService(Integer freelancerId, Integer userServiceId) {

        UserServices us = userServicesRepository.findById(userServiceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (!us.getUser().getUid().equals(freelancerId)) {
            throw new RuntimeException("Unauthorized");
        }

        userServicesRepository.delete(us);
    }

    // ================= RATINGS =================
    public Map<String, Object> getRatingsForService(Integer freelancerId, Integer serviceId) {

        Double avg = ratingRepository.getAverageRating(freelancerId, serviceId);

        Map<String, Object> map = new HashMap<>();
        map.put("averageRating", avg);
        map.put("ratings",
                ratingRepository.findByToUser_UidAndService_ServiceId(freelancerId, serviceId));

        return map;
    }

    // ================= MY SERVICE RATINGS =================
    public List<ServiceRatingDTO> getMyServiceRatings(Integer freelancerId) {

        List<Rating> ratings = ratingRepository.findByToUser_Uid(freelancerId);

        Map<Integer, List<Rating>> groupedRatings =
                ratings.stream().collect(Collectors.groupingBy(
                        r -> r.getService().getServiceId()));

        List<ServiceRatingDTO> result = new ArrayList<>();

        for (List<Rating> serviceRatings : groupedRatings.values()) {

            Double avg = serviceRatings.stream()
                    .mapToInt(Rating::getRating)
                    .average()
                    .orElse(0.0);

            Rating first = serviceRatings.get(0);

            result.add(new ServiceRatingDTO(
                    first.getService().getServiceId(),
                    first.getService().getServiceName(),
                    avg,
                    serviceRatings
            ));
        }

        return result;
    }

    // ================= MY COMPLAINTS =================
    public List<ComplaintResponseDTO> getMyComplaints(Integer freelancerId) {

        return complaintRepository.findByToUser_Uid(freelancerId)
                .stream()
                .map(c -> {
                    ComplaintResponseDTO dto = new ComplaintResponseDTO();
                    dto.setId(Long.valueOf(c.getComplaintId()));
                    dto.setServiceName(
                            c.getService() != null
                                    ? c.getService().getServiceName()
                                    : "General");
                    dto.setDescription(c.getDescription());
                    dto.setCreateDate(c.getCreateDate());
                    dto.setStatus(c.getStatus());
                    return dto;
                })
                .toList();
    }

    // ================= EARNINGS =================
    public EarningResponseDTO getMyEarnings(Integer freelancerId) {

        EarningResponseDTO dto = new EarningResponseDTO();
        dto.setTotalEarnings(billRepository.getTotalEarnings(freelancerId));
        dto.setPaidEarnings(billRepository.getPaidEarnings(freelancerId));
        dto.setPendingEarnings(billRepository.getPendingEarnings(freelancerId));

        return dto;
    }

    // ================= GENERATE BILL =================
    public void generateBill(Integer freelancerId, GenerateBillDTO dto) {

        System.out.println("Generating Bill for Requirement ID: " + dto.getRequirementId());

        // 1. Validate Requirement
        Requirement requirement = requirementRepository.findById(dto.getRequirementId())
                .orElseThrow(() -> new RuntimeException("Requirement not found with ID: " + dto.getRequirementId()));

        // 2. Validate User
        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found with ID: " + freelancerId));

        // 3. Validate Service
        Services service = servicesRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found with ID: " + dto.getServiceId()));

        // 4. Check for Existing Bill (Prevent Duplicates)
        try {
            if (billRepository.existsByRequirement_RequirementId(dto.getRequirementId())) {
                throw new RuntimeException("A bill has already been generated for this project.");
            }
        } catch (Exception e) {
            // This might fail if the DB column 'requirement_id' is missing. 
            // In that case, we can't reliably check for duplicates, but we should probably fail safe.
            System.err.println("Database check failed: " + e.getMessage());
            if (e.getMessage().contains("Unknown column")) {
                 throw new RuntimeException("Database Schema Error: Please restart the backend server to apply updates.");
            }
            throw e; 
        }

        // 5. Create Bill
        Bill bill = new Bill();
        
        // Fetch Client ID explicitly from the requirement to ensure NO MISMATCH
        Integer clientIdValue = requirementRepository.findClientIdByRequirementId(dto.getRequirementId());
        
        System.out.println("==================================================");
        System.out.println("CRITICAL DEBUG - GENERATING NEW BILL");
        System.out.println("DEBUG: Requirement ID = " + dto.getRequirementId());
        System.out.println("DEBUG: Client ID (from query) = " + clientIdValue);
        System.out.println("DEBUG: Freelancer ID (logged in) = " + freelancerId);
        
        bill.setUserId(clientIdValue);      // Explicitly for Client's payments section
        bill.setFreelancerId(freelancerId); // Explicitly for Freelancer's earnings section
        
        bill.setService(service);
        bill.setRequirement(requirement); 
        System.out.println("==================================================");

        // 6. Calculate Amounts
        java.math.BigDecimal amount = dto.getAmount() != null ? dto.getAmount() : java.math.BigDecimal.ZERO;
        java.math.BigDecimal tax = dto.getTax() != null ? dto.getTax() : java.math.BigDecimal.ZERO;
        
        bill.setAmount(amount);
        bill.setTax(tax);
        bill.setTotalAmount(amount.add(tax));
        
        // 7. Set Metadata
        bill.setBillDate(LocalDate.now());
        bill.setPaymentStatus("PENDING");
        bill.setPaymentMode("N/A"); 
        bill.setTransactionId("N/A"); 

        // 8. Save
        billRepository.save(bill);
        System.out.println("SUCCESS: Bill saved with Client=" + clientIdValue + ", Freelancer=" + freelancerId);
    }
    
    
 // ================= ALL SERVICES (MASTER LIST) =================
    public List<ServicesDTO> getAllServices() {

        return servicesRepository.findAll()
                .stream()
                .map(s -> new ServicesDTO(
                        s.getServiceId(),
                        s.getServiceName(),
                        s.getDescription(),
                        s.getIsActive()
                ))
                .toList();
    }

    // ================= PROFILE =================
    public UserProfileDTO getMyProfile(Integer freelancerId) {
        User user = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileDTO(
                user.getUid(),
                user.getFname(),
                user.getLname(),
                user.getEmail(),
                user.getPhone(),
                user.getAddr(),
                user.getCity() != null ? user.getCity().getCityId() : null,
                user.getCity() != null ? user.getCity().getCityName() : null,
                user.getState() != null ? user.getState().getStateId() : null,
                user.getState() != null ? user.getState().getStateName() : null
        );
    }

    public void updateMyProfile(Integer freelancerId, UserProfileDTO dto) {
        User user = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFname(dto.getFname());
        user.setLname(dto.getLname());

        // Validation for Email
        if (dto.getEmail() != null && !dto.getEmail().toLowerCase().endsWith("@gmail.com")) {
            throw new RuntimeException("Only @gmail.com emails are allowed");
        }
        user.setEmail(dto.getEmail());

        // Validation for Phone (exactly 10 digits)
        if (dto.getPhone() != null && !dto.getPhone().matches("\\d{10}")) {
            throw new RuntimeException("Phone number must be exactly 10 digits");
        }
        user.setPhone(dto.getPhone());

        user.setAddr(dto.getAddr());

        if (dto.getCity() != null) {
            City city = cityRepository.findById(dto.getCity())
                    .orElseThrow(() -> new RuntimeException("City not found"));
            user.setCity(city);
        }

        if (dto.getStateId() != null) {
            State state = stateRepository.findById(dto.getStateId())
                    .orElseThrow(() -> new RuntimeException("State not found"));
            user.setState(state);
        }

        userRepository.save(user);
    }

    public java.util.List<com.worksphere.freelancer.entity.State> getAllStates() {
        return stateRepository.findAll();
    }

    public java.util.List<com.worksphere.freelancer.entity.City> getCitiesByState(Integer stateId) {
        return cityRepository.findByState_StateId(stateId);
    }
}
