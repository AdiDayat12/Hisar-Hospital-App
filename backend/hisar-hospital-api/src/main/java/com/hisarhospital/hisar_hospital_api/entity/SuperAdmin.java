package com.hisarhospital.hisar_hospital_api.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author adilinan
 */

@Entity
@Table(name = "super_admin_table")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SuperAdmin {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;
}
