package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.service.PatientService;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

/**
 * @author adilinan
 */

@RestController
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('PATIENT')")
@RequestMapping("/patients/me")
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email) {
        PatientResponse response = patientService.findPatientByEmail(email);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient retrieved successfully", response));
    }


    @PutMapping
    public ResponseEntity<ApiResponse<?>> update(@CurrentSecurityContext(expression = "authentication?.name") String email, @RequestBody PatientRequest request) {
        Long id = patientService.findPatientByEmail(email).getId();
        PatientResponse response = patientService.update(id, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient updated successfully", response));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> delete(@CurrentSecurityContext(expression = "authentication?.name") String email) {
        Long id = patientService.findPatientByEmail(email).getId();
        patientService.deletePatient(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient deleted successfully", null));
    }
}
