package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.UserRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author adilinan
 */

public interface UserService {
    DoctorResponse registerDoctor (DoctorRequest request);
    UserResponse registerPatient (UserRequest request);
    AdminResponse registerAdmin (AdminRequest request);

}
