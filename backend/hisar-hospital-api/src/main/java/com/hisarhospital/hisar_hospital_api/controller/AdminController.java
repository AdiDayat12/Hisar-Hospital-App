package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.service.DoctorService;
import com.hisarhospital.hisar_hospital_api.service.PatientService;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * @author adilinan
 */

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin")
public class AdminController {
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final UserService userService;


    @PostMapping("/doctors")
    public ResponseEntity<ApiResponse<?>> createDoctor(@RequestBody DoctorRequest request) {
        DoctorResponse response = userService.registerDoctor(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED.value(), "Doctor created successfully", response));
    }



    @PutMapping("/doctors/{id}")
    public ResponseEntity<ApiResponse<?>> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequest request) {
        DoctorResponse response = doctorService.updateDoctor(id, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Doctor updated successfully", response));
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<ApiResponse<?>> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Doctor deleted successfully", null));
    }


    @GetMapping("/patients/{id}")
    public ResponseEntity<ApiResponse<?>> getPatientById(@PathVariable Long id) {
        PatientResponse response = patientService.findPatientById(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient retrieved successfully", response));
    }

    @GetMapping("/patients")
    public ResponseEntity<ApiResponse<?>> getAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PatientResponse> response = patientService.findAllPatients(PageRequest.of(page, size));
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patients retrieved successfully", response));
    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<ApiResponse<?>> updatePatient(@PathVariable Long id, @RequestBody PatientRequest request) {
        PatientResponse response = patientService.update(id, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient updated successfully", response));
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<ApiResponse<?>> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient deleted successfully", null));
    }

}
