package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.DoctorMapper;
import com.hisarhospital.hisar_hospital_api.repository.DoctorRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DoctorServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private DoctorMapper doctorMapper;

    @InjectMocks
    private DoctorServiceImpl doctorService;

    private UserEntity user;
    private Doctor doctor;
    private DoctorRequest request;
    private DoctorResponse response;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        doctor = new Doctor();
        doctor.setSpecialization("Cardiology");
        doctor.setQualification("MD");
        doctor.setPhotoUrl("photo.png");

        user = new UserEntity();
        user.setId(1L);
        user.setEmail("doc@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPhone("123456789");
        user.setPassword("encoded-pass");
        user.setRole(UserRole.DOCTOR);
        user.setDoctor(doctor);

        request = new DoctorRequest();
        request.setFirstName("Updated");
        request.setLastName("Doctor");
        request.setPhone("999999");
        request.setPassword("new-pass");
        request.setSpecialization("Neurology");
        request.setQualification("PhD");
        request.setPhotoUrl("new-photo.png");

        response = new DoctorResponse();
        response.setId(1L);
        response.setFirstName("Updated");
        response.setLastName("Doctor");
    }

    @Test
    void testUpdateDoctor_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("new-pass")).thenReturn("encoded-new-pass");
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);
        when(doctorMapper.toDoctorResponse(any(UserEntity.class), any(Doctor.class))).thenReturn(response);

        DoctorResponse result = doctorService.updateDoctor(1L, request);

        assertNotNull(result);
        assertEquals("Updated", result.getFirstName());
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    void testFindDoctorByEmail_Success() {
        when(userRepository.findByEmail("doc@example.com")).thenReturn(Optional.of(user));
        when(doctorMapper.toDoctorResponse(user, doctor)).thenReturn(response);

        DoctorResponse result = doctorService.findDoctorByEmail("doc@example.com");

        assertNotNull(result);
        assertEquals("Updated", result.getFirstName());
    }

    @Test
    void testFindDoctorByEmail_NotDoctor() {
        user.setRole(UserRole.ADMIN);
        when(userRepository.findByEmail("doc@example.com")).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class, () -> doctorService.findDoctorByEmail("doc@example.com"));
    }

    @Test
    void testFindDoctorById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(doctorMapper.toDoctorResponse(user, doctor)).thenReturn(response);

        DoctorResponse result = doctorService.findDoctorById(1L);

        assertNotNull(result);
        assertEquals("Updated", result.getFirstName());
    }

    @Test
    void testFindDoctorById_NotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> doctorService.findDoctorById(99L));
    }

    @Test
    void testFindAllDoctors_Success() {
        Page<UserEntity> page = new PageImpl<>(List.of(user));
        when(userRepository.findByRole(eq(UserRole.DOCTOR), any(PageRequest.class))).thenReturn(page);
        when(doctorMapper.toDoctorResponse(user, doctor)).thenReturn(response);

        Page<DoctorResponse> result = doctorService.findAllDoctors(PageRequest.of(0, 10));

        assertEquals(1, result.getTotalElements());
        assertEquals("Updated", result.getContent().get(0).getFirstName());
    }

    @Test
    void testDeleteDoctor_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        doctorService.deleteDoctor(1L);

        verify(doctorRepository, times(1)).delete(doctor);
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testDeleteDoctor_NotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> doctorService.deleteDoctor(99L));
    }
}
