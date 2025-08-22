package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.mapper.ProfileMapper;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private ProfileMapper mapper;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void getUserByEmail_ShouldReturnUserEntity () {
        Doctor doctor = new Doctor();
        Patient patient = new Patient();
        PatientResponse patientResponse = new PatientResponse();
        DoctorResponse doctorResponse = new DoctorResponse();

        Mockito.when(userRepository.findByEmail("patient")).thenReturn(Optional.of(patient));
        Mockito.when(userRepository.findByEmail("doctor")).thenReturn(Optional.of(doctor));

        Mockito.when(mapper.toPatientResponse(patient)).thenReturn(patientResponse);
        Mockito.when(mapper.toDoctorResponse(doctor)).thenReturn(doctorResponse);

        UserResponse resultPatient = userService.findByEmail("patient");
        UserResponse resultDoctor = userService.findByEmail("doctor");

        assertEquals(resultDoctor, doctorResponse);
        assertEquals(resultPatient, patientResponse);
    }

    @Test
    void getUserByEmail_NotFound_ShouldThrowException () {
        Mockito.when(userRepository.findByEmail("Found")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.findByEmail("notFound"));
    }
}