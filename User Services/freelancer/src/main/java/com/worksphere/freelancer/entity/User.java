package com.worksphere.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Integer uid;

    @ManyToOne
    @JoinColumn(name = "rid")
    private Role role;

    @Column(name = "fname")
    private String fname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "email")
    private String email;

    @Column(name = "pass")
    private String pass;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status")
    private Integer status;

    @Column(name = "addr")
    private String addr;

    @ManyToOne
    @JoinColumn(name = "state")
    private State state;

    @ManyToOne
    @JoinColumn(name = "city")
    private City city;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
