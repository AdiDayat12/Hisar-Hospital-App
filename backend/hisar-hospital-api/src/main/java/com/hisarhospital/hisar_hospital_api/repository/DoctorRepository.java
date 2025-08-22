package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author adilinan
 */

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
