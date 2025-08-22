package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.enums.Gender;
import com.hisarhospital.hisar_hospital_api.mapper.ProfileMapper;
import com.hisarhospital.hisar_hospital_api.repository.PatientRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@ExtendWith(MockitoExtension.class)
class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private ProfileMapper profileMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private PatientServiceImpl patientService;

    @Test
    void createPatient_ShouldReturnPatientResponse() {
        PatientRequest request = new PatientRequest(LocalDate.of(1990, 1, 1), Gender.MALE, "Address");
        Patient patient = new Patient();
        PatientResponse response = new PatientResponse();

        Mockito.when(profileMapper.toPatient(request)).thenReturn(patient);
        Mockito.when(patientRepository.save(patient)).thenReturn(patient);
        Mockito.when(profileMapper.toPatientResponse(patient)).thenReturn(response);

        PatientResponse result = patientService.register(request);

        Assertions.assertEquals(response, result);
        Mockito.verify(patientRepository).save(patient);
    }

    @Test
    void getPatientById_ShouldReturnPatientResponse() {
        Patient patient = new Patient();
        PatientResponse response = new PatientResponse();

        Mockito.when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        Mockito.when(profileMapper.toPatientResponse(patient)).thenReturn(response);

        PatientResponse result = patientService.getPatientById(1L);

        Assertions.assertEquals(response, result);
    }

    @Test
    void getPatientById_NotFound_ShouldThrowException() {
        Mockito.when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> patientService.getPatientById(1L));
    }

    @Test
    void getAllPatients_ShouldReturnPagedPatients() {
        Patient patient = new Patient();
        PatientResponse response = new PatientResponse();

        Page<Patient> patientsPage = new PageImpl<>(List.of(patient));
        Mockito.when(patientRepository.findAll(PageRequest.of(0, 10))).thenReturn(patientsPage);
        Mockito.when(profileMapper.toPatientResponse(patient)).thenReturn(response);

        Page<PatientResponse> result = patientService.getAllPatients(PageRequest.of(0, 10));

        Assertions.assertEquals(1, result.getTotalElements());
    }

    @Test
    void updatePatient_ShouldReturnUpdatedPatientResponse() {
        PatientRequest request = new PatientRequest();
        Patient patient = new Patient();
        PatientResponse response = new PatientResponse();

        Mockito.when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        Mockito.doNothing().when(profileMapper).updatePatientFromRequest(request, patient);
        Mockito.when(patientRepository.save(patient)).thenReturn(patient);
        Mockito.when(profileMapper.toPatientResponse(patient)).thenReturn(response);

        PatientResponse result = patientService.updatePatient(1L, request);

        Assertions.assertEquals(response, result);
    }

    @Test
    void deletePatient_ShouldDeleteSuccessfully() {
        Mockito.when(patientRepository.existsById(1L)).thenReturn(true);
        Mockito.doNothing().when(patientRepository).deleteById(1L);

        patientService.deletePatient(1L);

        Mockito.verify(patientRepository).deleteById(1L);
    }

    @Test
    void deletePatient_NotFound_ShouldThrowException() {
        Mockito.when(patientRepository.existsById(1L)).thenReturn(false);

        Assertions.assertThrows(RuntimeException.class, () -> patientService.deletePatient(1L));
    }
}
