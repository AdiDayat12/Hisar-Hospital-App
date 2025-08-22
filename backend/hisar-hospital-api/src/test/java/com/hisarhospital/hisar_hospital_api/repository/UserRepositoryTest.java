package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * @author adilinan
 */
@ActiveProfiles("test")
@DataJpaTest
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp () {
        Patient patient = new Patient();
        patient.setEmail("patient1@gmail.com");
        userRepository.save(patient);
        Doctor doctor = new Doctor();
        doctor.setEmail("doctor1@gmail.com");
        userRepository.save(doctor);
    }

    @Test
    void findByEmailSuccess () {
        Optional<UserEntity> patient = userRepository.findByEmail("patient1@gmail.com");
        Optional<UserEntity> doctor = userRepository.findByEmail("doctor1@gmail.com");
        assertTrue(patient.isPresent());
        assertTrue(doctor.isPresent());
    }

    @Test
    void findByEmailFail () {
        Optional<UserEntity> patient = userRepository.findByEmail("usernotfound@gmail.com");
        Optional<UserEntity> doctor = userRepository.findByEmail("usernotfound@gmail.com");
        assertTrue(patient.isEmpty());
        assertTrue(doctor.isEmpty());
    }

}