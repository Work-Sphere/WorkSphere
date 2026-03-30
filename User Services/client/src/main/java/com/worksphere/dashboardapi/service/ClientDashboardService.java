package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.ClientDashboardSummaryDto;
import com.worksphere.dashboardapi.entity.User;
import com.worksphere.dashboardapi.entity.City;
import com.worksphere.dashboardapi.entity.State;
import com.worksphere.dashboardapi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.worksphere.dashboardapi.dto.UserProfileDTO;

@Service
public class ClientDashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private RequirementRepository requirementRepository;

    @Autowired
    private RequirementRequestRepository requestRepository;

    @Autowired
    private BillRepository billRepository;

    public ClientDashboardSummaryDto getDashboardSummary(int clientId) {
        long totalRequirements = requirementRepository.countByClientId(clientId);
        long activeProjects = requirementRepository.countByClientIdAndStatus(clientId, "ACTIVE");
        long pendingRequests = requestRepository.countPendingRequestsByClientId(clientId);
        double totalAmountPaid = billRepository.getTotalAmountPaid(clientId);

        return new ClientDashboardSummaryDto(
                totalRequirements,
                activeProjects,
                pendingRequests,
                totalAmountPaid
        );
    }

    public UserProfileDTO getMyProfile(int clientId) {
        User user = userRepository.findById(clientId)
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

    public void updateMyProfile(int clientId, UserProfileDTO dto) {
        User user = userRepository.findById(clientId)
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

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public List<City> getCitiesByState(int stateId) {
        return cityRepository.findByState_StateId(stateId);
    }
}
