package com.hisarhospital.hisar_hospital_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * @author adilinan
 */

@Entity
@Table(name = "doctor_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
    @Id
    private Long id;
    private String specialization;
    private int experienceYears;
    private String qualification;
    private String schedule;
    private String photoUrl;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DoctorSchedule> schedules;
}
