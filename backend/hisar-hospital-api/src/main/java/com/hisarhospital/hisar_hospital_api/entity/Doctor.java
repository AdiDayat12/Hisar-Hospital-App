package com.hisarhospital.hisar_hospital_api.entity;

import jakarta.persistence.*;
import lombok.*;


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
    private String qualification;
    private String specialization;
    @Lob
    private String bio;
    private String practiceLocation;
    private String photoUrl;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

}
