package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author adilinan
 */

public interface DoctorService {
    DoctorResponse updateDoctor(Long id, DoctorRequest request);
    DoctorResponse findDoctorByEmail (String email);
    DoctorResponse findDoctorById (Long id);
    Page<DoctorResponse> findAllDoctors (Pageable pageable);
    void deleteDoctor(Long id);
}
