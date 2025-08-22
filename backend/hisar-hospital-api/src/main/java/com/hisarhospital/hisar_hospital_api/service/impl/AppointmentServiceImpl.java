package com.hisarhospital.hisar_hospital_api.service.impl;

/**
 * @author adilinan
 */

import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.entity.Appointment;
import com.hisarhospital.hisar_hospital_api.enums.AppointmentStatus;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.mapper.AppointmentMapper;
import com.hisarhospital.hisar_hospital_api.repository.AppointmentRepository;
import com.hisarhospital.hisar_hospital_api.repository.DoctorRepository;
import com.hisarhospital.hisar_hospital_api.repository.PatientRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;
import com.hisarhospital.hisar_hospital_api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentMapper appointmentMapper;

    @Override
    @Transactional
    public AppointmentResponse createAppointment(String patientEmail, AppointmentRequest request) {
        // Cek ketersediaan slot
        boolean isSlotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                request.getDoctorId(), request.getAppointmentDate(), request.getAppointmentTime());
        if (isSlotTaken) {
            throw new RuntimeException("Appointment slot is not available.");
        }

        // Dapatkan entitas Patient dan Doctor
        UserEntity patientUser = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("Patient not found."));
        Patient patient = patientUser.getPatient();

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found."));

        // Buat objek Appointment
        Appointment appointment = appointmentMapper.toAppointment(request);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        // Simpan ke database
        Appointment savedAppointment = appointmentRepository.save(appointment);

        return appointmentMapper.toAppointmentResponse(savedAppointment);
    }

    @Override
    public List<AppointmentResponse> getPatientAppointments(String patientEmail) {
        UserEntity patientUser = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("Patient not found."));
        Patient patient = patientUser.getPatient();

        List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());

        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getDoctorAppointments(String doctorEmail, LocalDate date) {
        UserEntity doctorUser = userRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found."));
        Doctor doctor = doctorUser.getDoctor();

        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentDate(doctor.getId(), date);

        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }
}