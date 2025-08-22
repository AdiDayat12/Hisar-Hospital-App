package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.mapper.ProfileMapper;
import com.hisarhospital.hisar_hospital_api.repository.DoctorRepository;
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

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@ExtendWith(MockitoExtension.class)
class DoctorServiceImplTest {

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private ProfileMapper profileMapper;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private DoctorServiceImpl doctorService;

    @Test
    void createDoctor_ShouldReturnDoctorResponse() {
        DoctorRequest request = new DoctorRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("email@test.com");
        request.setPassword("password");
        request.setPhone("12345");
        request.setSpecialization("Cardiology");
        request.setExperienceYears(10);
        request.setQualification("PhD");
        request.setPhotoUrl("photo.jpg");
        Doctor doctor = new Doctor();
        DoctorResponse response = new DoctorResponse();

        Mockito.when(profileMapper.toDoctor(request)).thenReturn(doctor);
        Mockito.when(doctorRepository.save(doctor)).thenReturn(doctor);
        Mockito.when(profileMapper.toDoctorResponse(doctor)).thenReturn(response);

        DoctorResponse result = doctorService.registerDoctor(request);

        Assertions.assertEquals(response, result);
        Mockito.verify(doctorRepository).save(doctor);
    }

    @Test
    void getDoctorById_ShouldReturnDoctorResponse() {
        Doctor doctor = new Doctor();
        DoctorResponse response = new DoctorResponse();

        Mockito.when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        Mockito.when(profileMapper.toDoctorResponse(doctor)).thenReturn(response);

        DoctorResponse result = doctorService.getDoctorById(1L);

        Assertions.assertEquals(response, result);
    }

    @Test
    void getDoctorById_NotFound_ShouldThrowException() {
        Mockito.when(doctorRepository.findById(1L)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> doctorService.getDoctorById(1L));
    }

    @Test
    void getAllDoctors_ShouldReturnPagedDoctors() {
        Doctor doctor = new Doctor();
        DoctorResponse response = new DoctorResponse();

        Page<Doctor> doctorsPage = new PageImpl<>(List.of(doctor));
        Mockito.when(doctorRepository.findAll(PageRequest.of(0, 10))).thenReturn(doctorsPage);
        Mockito.when(profileMapper.toDoctorResponse(doctor)).thenReturn(response);

        Page<DoctorResponse> result = doctorService.getAllDoctors(PageRequest.of(0, 10));

        Assertions.assertEquals(1, result.getTotalElements());
    }

    @Test
    void updateDoctor_ShouldReturnUpdatedDoctorResponse() {
        DoctorRequest request = new DoctorRequest();
        Doctor doctor = new Doctor();
        DoctorResponse response = new DoctorResponse();

        Mockito.when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        Mockito.doNothing().when(profileMapper).updateDoctorFromRequest(request, doctor);
        Mockito.when(doctorRepository.save(doctor)).thenReturn(doctor);
        Mockito.when(profileMapper.toDoctorResponse(doctor)).thenReturn(response);

        DoctorResponse result = doctorService.updateDoctor(1L, request);

        Assertions.assertEquals(response, result);
    }

    @Test
    void deleteDoctor_ShouldDeleteSuccessfully() {
        Mockito.when(doctorRepository.existsById(1L)).thenReturn(true);
        Mockito.doNothing().when(doctorRepository).deleteById(1L);

        doctorService.deleteDoctor(1L);

        Mockito.verify(doctorRepository).deleteById(1L);
    }

    @Test
    void deleteDoctor_NotFound_ShouldThrowException() {
        Mockito.when(doctorRepository.existsById(1L)).thenReturn(false);

        Assertions.assertThrows(RuntimeException.class, () -> doctorService.deleteDoctor(1L));
    }
}
