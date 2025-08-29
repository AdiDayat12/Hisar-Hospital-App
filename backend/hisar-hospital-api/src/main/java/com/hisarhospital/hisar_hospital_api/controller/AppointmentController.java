package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;
import com.hisarhospital.hisar_hospital_api.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
@Slf4j
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> createAppointment(
            @RequestBody AppointmentRequest request,
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        AppointmentResponse response = appointmentService.createAppointment(email, request);
        log.info("data: {}", response);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED.value(), "Appointment created successfully", response));

    }

    @GetMapping("/patient/me")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getPatientAppointments(
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        List<AppointmentResponse> response = appointmentService.getPatientAppointments(email);
        log.info("data all: {}", response);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", response));
    }

    @GetMapping("/doctor/me")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getDoctorAppointments(
            @CurrentSecurityContext(expression = "authentication?.name") String email,
            @RequestParam(required = false) LocalDate date) {

        List<AppointmentResponse> response;
        if (date != null) {
            response = appointmentService.getDoctorAppointmentsByDate(email, date);
        } else {
            response = appointmentService.getDoctorAppointments(email);
        }

        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", response)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AppointmentResponse>> getAppointment (@PathVariable  Long id) {
        log.info("id: {}", id);
        AppointmentResponse response = appointmentService.getAppointment(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", response));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<AppointmentResponse>> cancelAppointment (@PathVariable  Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Appointments retrieved successfully", null));
    }
}
