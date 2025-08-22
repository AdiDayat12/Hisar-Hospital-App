package com.hisarhospital.hisar_hospital_api.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author adilinan
 */

@Entity
@Table(name = "admin_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    @Id
    private Long id;
    private String department;
    private String phoneExtension;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;
}