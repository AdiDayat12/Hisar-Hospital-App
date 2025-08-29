package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.UserRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.exception.EmailAlreadyExistException;
import com.hisarhospital.hisar_hospital_api.mapper.AdminMapper;
import com.hisarhospital.hisar_hospital_api.mapper.DoctorMapper;
import com.hisarhospital.hisar_hospital_api.mapper.UserMapper;
import com.hisarhospital.hisar_hospital_api.repository.*;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


/**
 * @author adilinan
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;
    private final DoctorMapper doctorMapper;
    private final AdminMapper adminMapper;
    private final UserMapper userMapper;

    @Override
    public DoctorResponse registerDoctor(DoctorRequest request) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()){
            throw new EmailAlreadyExistException("This email already registered");
        }
        UserEntity user = doctorMapper.toUserEntity(request);
        Doctor doctor = doctorMapper.toDoctor(request);

        // Set phone
        user.setPhone(request.getPhone());
        // Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        UserEntity savedUser = userRepository.save(user);

        doctor.setUser(savedUser);

        Doctor savedDoctor = doctorRepository.save(doctor);

        return doctorMapper.toDoctorResponse(savedUser, savedDoctor);
    }

    @Override
    public UserResponse registerPatient(UserRequest request) {
        UserEntity user = userMapper.toUserEntity(request);
        Patient patient = new Patient();
        // encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserEntity savedUser = userRepository.save(user);

        patient.setUser(savedUser);

        patientRepository.save(patient);

        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public AdminResponse registerAdmin(AdminRequest request) {

        UserEntity user = adminMapper.toUserEntity(request);
        Admin admin = adminMapper.toAdmin(request);

        // encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserEntity savedUser = userRepository.save(user);

        admin.setUser(savedUser);

        Admin savedAdmin = adminRepository.save(admin);

        return adminMapper.toAdminResponse(savedUser, savedAdmin);
    }
}
