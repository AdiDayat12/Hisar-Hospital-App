package com.hisarhospital.hisar_hospital_api.entity;

import com.hisarhospital.hisar_hospital_api.enums.Status;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
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
