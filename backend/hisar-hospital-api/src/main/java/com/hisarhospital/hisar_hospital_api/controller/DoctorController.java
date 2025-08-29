package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.service.DoctorService;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/doctors")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getDoctor (@CurrentSecurityContext(expression = "authentication?.name") String email) {
        UserResponse response = doctorService.findDoctorByEmail(email);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Doctor retrieved successfully", response));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getDoctorById(@PathVariable Long id) {
        DoctorResponse response = doctorService.findDoctorById(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Doctor retrieved successfully", response));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllDoctor(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size)
    {
        Page<DoctorResponse> response = doctorService.findAllDoctors(PageRequest.of(page, size));
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Doctors retrieved successfully", response));
    }

    // put some logic which relates to patients like appointment and see their profiles
}
