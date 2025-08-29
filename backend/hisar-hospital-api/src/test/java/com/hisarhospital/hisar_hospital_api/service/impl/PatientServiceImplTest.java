package com.hisarhospital.hisar_hospital_api.service.impl;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @author adilinan
 */
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.PatientMapper;
import com.hisarhospital.hisar_hospital_api.repository.PatientRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientMapper patientMapper;

    @InjectMocks
    private PatientServiceImpl patientService;

    private UserEntity user;
    private Patient patient;
    private PatientRequest request;
    private PatientResponse response;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        patient = new Patient();
        patient.setId(1L);
        patient.setAddress("Old Address");
        patient.setBirthDate(LocalDate.of(1990, 1, 1));

        user = new UserEntity();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setRole(UserRole.PATIENT);
        user.setPatient(patient);

        patient.setUser(user);

        request = new PatientRequest();
        request.setFirstName("Jane");
        request.setLastName("Smith");
        request.setIdentityNumber("12345");
        request.setPhone("555-123");
        request.setAddress("New Address");
        request.setBirthDate(LocalDate.of(1995, 5, 5));

        response = new PatientResponse();
        response.setId(1L);
        response.setFirstName("Jane");
        response.setLastName("Smith");
    }

    @Test
    void testUpdate_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);
        when(patientMapper.toPatientResponse(any(UserEntity.class), any(Patient.class))).thenReturn(response);

        PatientResponse result = patientService.update(1L, request);

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
        verify(userRepository).save(any(UserEntity.class));
        verify(patientRepository).save(any(Patient.class));
    }

    @Test
    void testFindPatientByEmail_Success() {
        when(userRepository.findByEmail("test@mail.com")).thenReturn(Optional.of(user));
        when(patientMapper.toPatientResponse(user, patient)).thenReturn(response);

        PatientResponse result = patientService.findPatientByEmail("test@mail.com");

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
    }

    @Test
    void testFindPatientByEmail_NotFound() {
        when(userRepository.findByEmail("notfound@mail.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> patientService.findPatientByEmail("notfound@mail.com"));
    }

    @Test
    void testFindPatientById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(patientMapper.toPatientResponse(user, patient)).thenReturn(response);

        PatientResponse result = patientService.findPatientById(1L);

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
    }

    @Test
    void testFindAllPatients() {
        Page<UserEntity> page = new PageImpl<>(List.of(user));
        when(userRepository.findByRole(eq(UserRole.PATIENT), any(Pageable.class))).thenReturn(page);
        when(patientMapper.toPatientResponse(user, patient)).thenReturn(response);

        Page<PatientResponse> result = patientService.findAllPatients(PageRequest.of(0, 10));

        assertEquals(1, result.getTotalElements());
        assertEquals("Jane", result.getContent().get(0).getFirstName());
    }

    @Test
    void testDeletePatient() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        patientService.deletePatient(1L);

        verify(patientRepository).delete(patient);
        verify(userRepository).delete(user);
    }
}
