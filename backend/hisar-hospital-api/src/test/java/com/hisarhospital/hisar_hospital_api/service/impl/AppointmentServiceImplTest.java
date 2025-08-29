package com.hisarhospital.hisar_hospital_api.service.impl;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @author adilinan
 */

import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;
import com.hisarhospital.hisar_hospital_api.entity.Appointment;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.AppointmentStatus;
import com.hisarhospital.hisar_hospital_api.exception.InvalidAppointmentDateException;
import com.hisarhospital.hisar_hospital_api.exception.SlotNotAvailableException;
import com.hisarhospital.hisar_hospital_api.mapper.AppointmentMapper;
import com.hisarhospital.hisar_hospital_api.repository.AppointmentRepository;
import com.hisarhospital.hisar_hospital_api.repository.DoctorRepository;
import com.hisarhospital.hisar_hospital_api.repository.PatientRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AppointmentServiceImplTest {

    @Mock
    private AppointmentRepository appointmentRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private DoctorRepository doctorRepository;
    @Mock
    private PatientRepository patientRepository;
    @Mock
    private AppointmentMapper appointmentMapper;

    @InjectMocks
    private AppointmentServiceImpl appointmentService;

    private UserEntity patientUser;
    private Patient patient;
    private UserEntity doctorUser;
    private Doctor doctor;
    private Appointment appointment;
    private AppointmentRequest request;
    private AppointmentResponse response;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Patient
        patient = new Patient();
        patient.setId(1L);

        patientUser = new UserEntity();
        patientUser.setId(1L);
        patientUser.setFirstName("Jane");
        patientUser.setLastName("Doe");
        patientUser.setPatient(patient);
        patient.setUser(patientUser);

        // Doctor
        doctor = new Doctor();
        doctor.setId(2L);

        doctorUser = new UserEntity();
        doctorUser.setId(2L);
        doctorUser.setFirstName("John");
        doctorUser.setLastName("Smith");
        doctorUser.setDoctor(doctor);
        doctor.setUser(doctorUser);

        // Appointment
        appointment = new Appointment();
        appointment.setId(10L);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(LocalDate.now().plusDays(1));
        appointment.setAppointmentTime(LocalTime.of(10, 0));
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        request = new AppointmentRequest();
        request.setDoctorId(2L);
        request.setAppointmentDate(LocalDate.now().plusDays(1));
        request.setAppointmentTime(LocalTime.of(10, 0));
        request.setSpecialization("Cardiology");

        response = new AppointmentResponse();
        response.setId(10L);
        response.setDoctorId(2L);
        response.setPatientId(1L);
        response.setSpecialization("Cardiology");
    }

    @Test
    void testCreateAppointment_Success() {
        when(appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                anyLong(), any(LocalDate.class), any(LocalTime.class))).thenReturn(false);
        when(userRepository.findByEmail("patient@mail.com")).thenReturn(Optional.of(patientUser));
        when(doctorRepository.findById(2L)).thenReturn(Optional.of(doctor));
        when(appointmentMapper.toAppointment(request)).thenReturn(appointment);
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(appointment);
        when(appointmentMapper.toAppointmentResponse(appointment)).thenReturn(response);

        AppointmentResponse result = appointmentService.createAppointment("patient@mail.com", request);

        assertNotNull(result);
        assertEquals(10L, result.getId());
        verify(appointmentRepository).save(any(Appointment.class));
    }

    @Test
    void testCreateAppointment_InvalidDate() {
        request.setAppointmentDate(LocalDate.now().minusDays(1)); // masa lalu
        assertThrows(InvalidAppointmentDateException.class,
                () -> appointmentService.createAppointment("patient@mail.com", request));
    }

    @Test
    void testCreateAppointment_SlotTaken() {
        when(appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                anyLong(), any(LocalDate.class), any(LocalTime.class))).thenReturn(true);

        assertThrows(SlotNotAvailableException.class,
                () -> appointmentService.createAppointment("patient@mail.com", request));
    }

    @Test
    void testGetPatientAppointments() {
        when(userRepository.findByEmail("patient@mail.com")).thenReturn(Optional.of(patientUser));
        when(appointmentRepository.findByPatientId(1L)).thenReturn(List.of(appointment));
        when(appointmentMapper.toAppointmentResponse(appointment)).thenReturn(response);

        var results = appointmentService.getPatientAppointments("patient@mail.com");

        assertEquals(1, results.size());
        assertEquals(10L, results.get(0).getId());
    }

    @Test
    void testGetDoctorAppointmentsByDate() {
        when(userRepository.findByEmail("doctor@mail.com")).thenReturn(Optional.of(doctorUser));
        when(appointmentRepository.findByDoctorIdAndAppointmentDate(eq(2L), any(LocalDate.class)))
                .thenReturn(List.of(appointment));
        when(appointmentMapper.toAppointmentResponse(appointment)).thenReturn(response);

        var results = appointmentService.getDoctorAppointmentsByDate("doctor@mail.com", LocalDate.now());

        assertEquals(1, results.size());
        assertEquals("Cardiology", results.get(0).getSpecialization());
    }

    @Test
    void testGetDoctorAppointments() {
        when(userRepository.findByEmail("doctor@mail.com")).thenReturn(Optional.of(doctorUser));
        when(appointmentRepository.findByDoctorId(2L)).thenReturn(List.of(appointment));
        when(appointmentMapper.toAppointmentResponse(appointment)).thenReturn(response);

        var results = appointmentService.getDoctorAppointments("doctor@mail.com");

        assertEquals(1, results.size());
        assertEquals(10L, results.get(0).getId());
    }

    @Test
    void testGetAppointment() {
        when(appointmentRepository.getReferenceById(10L)).thenReturn(appointment);
        when(appointmentMapper.toAppointmentResponse(appointment)).thenReturn(response);

        AppointmentResponse result = appointmentService.getAppointment(10L);

        assertNotNull(result);
        assertEquals(10L, result.getId());
    }

    @Test
    void testCancelAppointment() {
        when(appointmentRepository.getReferenceById(10L)).thenReturn(appointment);

        appointmentService.cancelAppointment(10L);

        assertEquals(AppointmentStatus.CANCELLED, appointment.getStatus());
        verify(appointmentRepository).save(appointment);
    }
}
