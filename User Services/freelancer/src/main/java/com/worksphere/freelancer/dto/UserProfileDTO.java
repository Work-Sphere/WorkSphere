package com.worksphere.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Integer uid;
    private String fname;
    private String lname;
    private String email;
    private String phone;
    private String addr;
    private Integer city;
    private String cityName;
    private Integer stateId;
    private String stateName;
}
