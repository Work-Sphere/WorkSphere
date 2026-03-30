package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "state")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "state_id")
    private Integer stateId;

    @Column(name = "stateName")
    private String stateName;
}
