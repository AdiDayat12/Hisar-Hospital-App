package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.mysql.cj.log.Log;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@DataJpaTest
@ActiveProfiles("test")

class DoctorRepositoryTest {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void testSaveAndFindById() {
        // given: buat user terlebih dahulu
        UserEntity user = new UserEntity();
        user.setEmail("doctor@example.com");
        user.setRole(UserRole.DOCTOR);
        entityManager.persist(user);

        // buat doctor yang terhubung ke user
        Doctor doctor = new Doctor();
        doctor.setQualification("MD");
        doctor.setSpecialization("Cardiology");
        doctor.setBio("Experienced cardiologist with 10+ years in practice.");
        doctor.setPracticeLocation("Hisar Hospital");
        doctor.setPhotoUrl("http://example.com/photo.jpg");
        doctor.setUser(user);

        Doctor savedDoctor = doctorRepository.save(doctor);

        // when
        Optional<Doctor> foundDoctor = doctorRepository.findById(savedDoctor.getId());

        // then
        assertThat(foundDoctor).isPresent();
        assertThat(foundDoctor.get().getSpecialization()).isEqualTo("Cardiology");
        assertThat(foundDoctor.get().getUser().getEmail()).isEqualTo("doctor@example.com");
    }

    @Test
    void testFindAll() {
        // given
        UserEntity user1 = new UserEntity();
        user1.setEmail("doc1@example.com");
        user1.setRole(UserRole.DOCTOR);
        entityManager.persist(user1);

        UserEntity user2 = new UserEntity();
        user2.setEmail("doc2@example.com");
        user2.setRole(UserRole.DOCTOR);
        entityManager.persist(user2);

        Doctor doctor1 = new Doctor();
        doctor1.setQualification("MBBS");
        doctor1.setSpecialization("Neurology");
        doctor1.setUser(user1);

        Doctor doctor2 = new Doctor();
        doctor2.setQualification("MD");
        doctor2.setSpecialization("Dermatology");
        doctor2.setUser(user2);

        doctorRepository.saveAll(List.of(doctor1, doctor2));

        // when
        List<Doctor> doctors = doctorRepository.findAll();

        // then
        assertThat(doctors).hasSize(2);
    }

    @Test
    void testDelete() {
        // given
        UserEntity user = new UserEntity();
        user.setEmail("deleteDoc@example.com");
        user.setRole(UserRole.DOCTOR);
        entityManager.persist(user);

        Doctor doctor = new Doctor();
        doctor.setQualification("MD");
        doctor.setSpecialization("Orthopedics");
        doctor.setUser(user);

        Doctor savedDoctor = doctorRepository.save(doctor);

        // when
        doctorRepository.delete(savedDoctor);

        // then
        Optional<Doctor> foundDoctor = doctorRepository.findById(savedDoctor.getId());
        assertThat(foundDoctor).isNotPresent();
    }
}
