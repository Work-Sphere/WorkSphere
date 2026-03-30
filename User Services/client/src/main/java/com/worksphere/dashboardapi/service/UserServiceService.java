package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.dto.UserServiceViewDto;
import com.worksphere.dashboardapi.repository.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceService {

    @Autowired
    private UserServiceRepository userServiceRepository;

    public List<UserServiceViewDto> getAcceptedUserServicesForClient(int clientId) {

        List<Object[]> rows =
            userServiceRepository.findAcceptedUserServicesForClient(clientId);

        List<UserServiceViewDto> result = new ArrayList<>();

        for (Object[] r : rows) {
            result.add(new UserServiceViewDto(
                ((Number) r[0]).intValue(),   // userServiceId
                ((Number) r[1]).intValue(),   // freelancerId
                (String) r[2],                // freelancerName
                ((Number) r[3]).intValue(),   // serviceId
                (String) r[4],                // serviceName
                ((Number) r[5]).doubleValue() // customPrice
            ));
        }

        return result;
    }


}
