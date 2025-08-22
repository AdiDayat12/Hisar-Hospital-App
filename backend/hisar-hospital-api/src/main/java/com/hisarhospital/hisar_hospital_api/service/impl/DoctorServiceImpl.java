package com.hisarhospital.hisar_hospital_api.service.impl;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.DoctorMapper;
import com.hisarhospital.hisar_hospital_api.repository.DoctorRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import com.hisarhospital.hisar_hospital_api.service.DoctorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author adilinan
 */


@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final DoctorMapper doctorMapper;


    @Override
    @Transactional
    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Doctor doctor = user.getDoctor();
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setPhotoUrl(request.getPhotoUrl());

        UserEntity updatedDoctor = userRepository.save(user);
        return doctorMapper.toDoctorResponse(updatedDoctor, doctor);
    }

    @Override
    public DoctorResponse findDoctorByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.DOCTOR) {
            throw new RuntimeException("Not doctor");
        }

        Doctor doctor = user.getDoctor();
        return doctorMapper.toDoctorResponse(user, doctor);
    }


    @Override
    public DoctorResponse findDoctorById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (user.getRole() != UserRole.DOCTOR) {
            throw new RuntimeException("Not doctor");
        }
        return doctorMapper.toDoctorResponse(user, user.getDoctor());
    }


    @Override
    public Page<DoctorResponse> findAllDoctors(Pageable pageable) {
        Page<UserEntity> page = userRepository.findByRole(UserRole.DOCTOR, pageable);
        return page.map(user -> {
            Doctor doctor = user.getDoctor();
            return doctorMapper.toDoctorResponse(user, doctor);
        });
    }

    @Override
    public void deleteDoctor(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found"));

        if (user.getDoctor() != null) {
            doctorRepository.delete(user.getDoctor());
        }
        userRepository.delete(user);
    }
}
