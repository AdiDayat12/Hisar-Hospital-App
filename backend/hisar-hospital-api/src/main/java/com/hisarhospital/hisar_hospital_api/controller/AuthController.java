package com.hisarhospital.hisar_hospital_api.controller;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.dto.request.*;
import com.hisarhospital.hisar_hospital_api.dto.response.LoginResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.service.CustomUserDetailsService;
import com.hisarhospital.hisar_hospital_api.service.OtpService;
import com.hisarhospital.hisar_hospital_api.service.PatientService;
import com.hisarhospital.hisar_hospital_api.service.UserService;
import com.hisarhospital.hisar_hospital_api.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.Map;

/**
 * @author adilinan
 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;
    private final UserService userService;

    @PostMapping("/patients/register")
    public ResponseEntity<ApiResponse<?>> create (@RequestBody UserRequest request) {
        userService.registerPatient(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED.value(), "Patient created successfully", "OK"));
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login (@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            final String jwtToken = jwtUtil.generateToken(userDetails);
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true)
                    .sameSite("Strict")
                    .maxAge(Duration.ofDays(30))
                    .path("/")
                    .build();
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new ApiResponse<>(HttpStatus.OK.value(), "success", jwtToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), "Incorrect email or password", null));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<?>> verifyOtp (@RequestBody VerifyOtpRequest request) {
        otpService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok().body(
                ApiResponse.builder()
                        .message("OK")
                        .build()
        );
    }

    @PostMapping("/send-reset-otp")
    public void sendResetOtp (@RequestParam String email) {
        try {
            otpService.sendResetOtp(email);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> resetPassword (@Valid @RequestBody UpdatePasswordRequest updateRequest) {
        String email = updateRequest.getEmail();
        String otp = updateRequest.getOtp();
        String password = updateRequest.getNewPassword();
        log.info("email yang masuk: {}", email );
        otpService.resetPassword(email, otp, password);
        return ResponseEntity.ok().body(
                ApiResponse.builder()
                        .data(null)
                        .build()
        );
    }

    @DeleteMapping("/logout")
    public void logout (@CurrentSecurityContext (expression = "authentication?.name") String email) {

    }
}
