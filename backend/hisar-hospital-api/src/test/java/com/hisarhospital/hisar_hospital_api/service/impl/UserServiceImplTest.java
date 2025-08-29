package com.hisarhospital.hisar_hospital_api.service.impl;


import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.entity.*;
import com.hisarhospital.hisar_hospital_api.mapper.AdminMapper;
import com.hisarhospital.hisar_hospital_api.mapper.DoctorMapper;
import com.hisarhospital.hisar_hospital_api.mapper.PatientMapper;
import com.hisarhospital.hisar_hospital_api.mapper.UserMapper;
import com.hisarhospital.hisar_hospital_api.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

/*
  @author adilinan
 */

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock private UserRepository userRepository;
    @Mock private DoctorRepository doctorRepository;
    @Mock private PatientRepository patientRepository;
    @Mock private AdminRepository adminRepository;
    @Mock private PasswordEncoder passwordEncoder;

    @Mock private DoctorMapper doctorMapper;
    @Mock private AdminMapper adminMapper;
    @Mock private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerDoctor_ShouldReturnDoctorResponse() {
        DoctorRequest request = new DoctorRequest();
        request.setEmail("doc123@test.com");
        request.setPassword("rawpass");

        UserEntity userEntity = new UserEntity();
        Doctor doctor = new Doctor();
        DoctorResponse doctorResponse = new DoctorResponse();

        when(doctorMapper.toUserEntity(any(DoctorRequest.class))).thenReturn(userEntity);
        when(passwordEncoder.encode("rawpass")).thenReturn("encodedpass");
        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(doctorMapper.toDoctor(any(DoctorRequest.class))).thenReturn(doctor);
        when(doctorRepository.save(doctor)).thenReturn(doctor);
        when(doctorMapper.toDoctorResponse(userEntity, doctor)).thenReturn(doctorResponse);

        DoctorResponse result = userService.registerDoctor(request);

        assertThat(result).isEqualTo(doctorResponse);
        verify(userRepository).save(userEntity);
        verify(doctorRepository).save(doctor);
    }

    @Test
    void registerPatient_ShouldReturnUserResponse() {
        PatientRequest request = new PatientRequest();
        request.setEmail("patient@test.com");
        request.setPassword("rawpass");

        UserEntity userEntity = new UserEntity();
        Patient patient = new Patient();
        UserResponse userResponse = new UserResponse();

        when(userMapper.toUserEntity(any(PatientRequest.class))).thenReturn(userEntity);
        when(passwordEncoder.encode("rawpass")).thenReturn("encodedpass");
        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);
        when(userMapper.toUserResponse(userEntity)).thenReturn(userResponse);

        UserResponse result = userService.registerPatient(request);

        assertThat(result).isEqualTo(userResponse);
        verify(userRepository).save(userEntity);
        verify(patientRepository).save(any(Patient.class));
    }

    @Test
    void registerAdmin_ShouldReturnAdminResponse() {
        AdminRequest request = new AdminRequest();
        request.setEmail("admin@test.com");
        request.setPassword("rawpass");

        UserEntity userEntity = new UserEntity();
        Admin admin = new Admin();
        AdminResponse adminResponse = new AdminResponse();

        when(adminMapper.toUserEntity(any(AdminRequest.class))).thenReturn(userEntity);
        when(passwordEncoder.encode("rawpass")).thenReturn("encodedpass");
        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(adminMapper.toAdmin(any(AdminRequest.class))).thenReturn(admin);
        when(adminRepository.save(admin)).thenReturn(admin);
        when(adminMapper.toAdminResponse(userEntity, admin)).thenReturn(adminResponse);

        AdminResponse result = userService.registerAdmin(request);

        assertThat(result).isEqualTo(adminResponse);
        verify(userRepository).save(userEntity);
        verify(adminRepository).save(admin);
    }
}
