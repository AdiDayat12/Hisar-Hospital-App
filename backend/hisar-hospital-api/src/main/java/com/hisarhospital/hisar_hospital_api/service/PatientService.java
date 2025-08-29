package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author adilinan
 */

public interface PatientService {
    PatientResponse update (Long id, PatientRequest request);
    PatientResponse findPatientByEmail (String email);
    PatientResponse findPatientById (Long id);
    Page<PatientResponse> findAllPatients(Pageable pageable);
    void deletePatient (Long id);

}
