package com.worksphere.freelancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.worksphere")
@EnableJpaRepositories(basePackages = "com.worksphere")
@EntityScan(basePackages = "com.worksphere")
public class FreelancerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FreelancerApplication.class, args);
    }
}
 	