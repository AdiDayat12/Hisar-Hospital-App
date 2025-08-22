package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.LoginRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.AdminMapper;
import com.hisarhospital.hisar_hospital_api.repository.AdminRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import com.hisarhospital.hisar_hospital_api.service.AdminService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author adilinan
 */

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;

    @Override
    @Transactional
    public AdminResponse updateAdmin (Long id, AdminRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Admin admin = user.getAdmin();
        admin.setDepartment(request.getDepartment());
        admin.setPhoneExtension(request.getPhoneExtension());

        UserEntity updatedAdmin = userRepository.save(user);

        return adminMapper.toAdminResponse(updatedAdmin, admin);
    }

    @Override
    public AdminResponse findAdminByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Not admin");
        }
        return null;
    }

    @Override
    public AdminResponse findAdminById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Not admin");
        }
        return adminMapper.toAdminResponse(user, user.getAdmin());
    }

    @Override
    public void deleteAdmin (Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found"));

        if (user.getAdmin() != null) {
            adminRepository.delete(user.getAdmin());
        }
        userRepository.delete(user);
    }

}
