package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.UserRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;

/**
 * @author adilinan
 */

public interface UserService {
    DoctorResponse registerDoctor (DoctorRequest request);
    UserResponse registerPatient (UserRequest request);
    AdminResponse registerAdmin (AdminRequest request);

}
