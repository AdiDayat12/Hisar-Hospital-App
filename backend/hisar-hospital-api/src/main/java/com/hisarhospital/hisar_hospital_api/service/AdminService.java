package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.LoginRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;

/**
 * @author adilinan
 */

public interface AdminService {
    AdminResponse updateAdmin (Long id,  AdminRequest request);
    AdminResponse findAdminByEmail(String email);
    AdminResponse findAdminById(Long id);
    void deleteAdmin (Long id);
}
