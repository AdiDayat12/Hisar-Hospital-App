package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;
import com.hisarhospital.hisar_hospital_api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * @author adilinan
 */

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> createAppointment(
            @RequestBody AppointmentRequest request,
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        AppointmentResponse response = appointmentService.createAppointment(email, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointment created successfully", response));
    }

    @GetMapping("/patient/me")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getPatientAppointments(
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        List<AppointmentResponse> response = appointmentService.getPatientAppointments(email);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", response));
    }

    @GetMapping("/doctor/me")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getDoctorAppointments(
            @CurrentSecurityContext(expression = "authentication?.name") String email,
            @RequestParam LocalDate date) {
        List<AppointmentResponse> response = appointmentService.getDoctorAppointments(email, date);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", response));
    }
}
