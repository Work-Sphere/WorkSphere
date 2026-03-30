package com.worksphere.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Changed from LocalDateTime to LocalDate

@Data                   
@NoArgsConstructor      
@AllArgsConstructor     
public class ComplaintResponseDTO {
    private Long id;
    private String serviceName;
    private String description;
    private LocalDate createDate; // Changed from createdAt to createDate
    private String status;
}