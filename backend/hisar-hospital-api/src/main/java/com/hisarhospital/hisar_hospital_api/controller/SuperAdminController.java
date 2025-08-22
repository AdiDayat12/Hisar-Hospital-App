package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.LoginRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.service.AdminService;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * @author adilinan
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/super-admin")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminController {
    private final AdminService adminService;
    private final UserService userService;
    @PostMapping("/create-admin")
    public ResponseEntity<ApiResponse<?>> createAdmin (@RequestBody AdminRequest request) {
        AdminResponse response = userService.registerAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED.value(), "Admin created successfully", response));
    }

    @PutMapping("/update-admin")
    public ResponseEntity<ApiResponse<?>> updateAdmin (@PathVariable Long id, @RequestBody AdminRequest request) {
        AdminResponse response = adminService.updateAdmin(id, request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>(HttpStatus.OK.value(), "Admin created successfully", response));
    }

    @DeleteMapping("/delete-admin/{id}")
    public ResponseEntity<ApiResponse<?>> deletePatient(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Patient deleted successfully", null));
    }

}
