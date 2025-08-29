package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.entity.OtpToken;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.OtpPurpose;
import com.hisarhospital.hisar_hospital_api.enums.Status;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.PatientMapper;
import com.hisarhospital.hisar_hospital_api.repository.OtpRepository;
import com.hisarhospital.hisar_hospital_api.repository.PatientRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import com.hisarhospital.hisar_hospital_api.service.EmailService;
import com.hisarhospital.hisar_hospital_api.service.OtpService;
import com.hisarhospital.hisar_hospital_api.service.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

/**
 * @author adilinan
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final OtpService otpService;
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final PatientMapper patientMapper;

    @Override
    @Transactional // Pastikan ada anotasi ini
    public PatientResponse update(Long id, PatientRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setIdentityNumber(request.getIdentityNumber());
        user.setPhone(request.getPhone());

        Patient patient = user.getPatient();

        patient.setBirthDate(request.getBirthDate());
        patient.setAddress(request.getAddress());

        UserEntity updatedUser = userRepository.save(user);

        patient.setUser(updatedUser);

        Patient updatedPatient = patientRepository.save(patient);

        return patientMapper.toPatientResponse(updatedUser, updatedPatient);
    }

    @Override
    public PatientResponse findPatientByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.PATIENT) {
            throw new RuntimeException("Not patient");
        }
        Patient patient = user.getPatient();
        return patientMapper.toPatientResponse(user, patient);
    }

    @Override
    public PatientResponse findPatientById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.PATIENT) {
            throw new RuntimeException("Not patient");
        }
        return patientMapper.toPatientResponse(user, user.getPatient());
    }

    @Override
    public Page<PatientResponse> findAllPatients(Pageable pageable) {
        Page<UserEntity> page = userRepository.findByRole(UserRole.PATIENT, pageable);
        return page.map(user -> {
            Patient patient = user.getPatient();
            return patientMapper.toPatientResponse(user, patient);
        });
    }

    @Override
    public void deletePatient(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (user.getPatient() != null) {
            patientRepository.delete(user.getPatient());
        }
        userRepository.delete(user);
    }




}
