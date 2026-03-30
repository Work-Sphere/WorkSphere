package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    private int rid;
    private String fname;
    private String lname;
    private String email;
    private String phone;
    private String pass;
    private int status;
    private String addr;

    @ManyToOne
    @JoinColumn(name = "state")
    private State state;

    @ManyToOne
    @JoinColumn(name = "city")
    private City city;
}
