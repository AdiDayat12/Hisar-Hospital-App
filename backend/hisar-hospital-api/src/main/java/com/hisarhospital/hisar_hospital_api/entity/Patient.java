package com.hisarhospital.hisar_hospital_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 * @author adilinan
 */

@Entity
@Table(name = "patient_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    @Id
    private Long id;
    private LocalDate birthDate;
    private String address;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;
}
