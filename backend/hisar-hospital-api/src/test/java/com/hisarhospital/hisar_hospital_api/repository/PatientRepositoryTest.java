package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */


@DataJpaTest
@ActiveProfiles("test")
class PatientRepositoryTest {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void testSaveAndFindById() {
        // given: persist UserEntity dulu
        UserEntity user = new UserEntity();
        user.setEmail("patient@example.com");
        user.setRole(UserRole.PATIENT);
        entityManager.persist(user);

        // buat Patient terkait user tsb
        Patient patient = new Patient();
        patient.setBirthDate(LocalDate.of(2000, 1, 1));
        patient.setAddress("123 Main Street");
        patient.setUser(user);

        Patient savedPatient = patientRepository.save(patient);

        // when
        Optional<Patient> foundPatient = patientRepository.findById(savedPatient.getId());

        // then
        assertThat(foundPatient).isPresent();
        assertThat(foundPatient.get().getAddress()).isEqualTo("123 Main Street");
        assertThat(foundPatient.get().getUser().getEmail()).isEqualTo("patient@example.com");
    }

    @Test
    void testFindAll() {
        // given
        UserEntity user1 = new UserEntity();
        user1.setEmail("patient1@example.com");
        user1.setRole(UserRole.PATIENT);
        entityManager.persist(user1);

        UserEntity user2 = new UserEntity();
        user2.setEmail("patient2@example.com");
        user2.setRole(UserRole.PATIENT);
        entityManager.persist(user2);

        Patient patient1 = new Patient();
        patient1.setBirthDate(LocalDate.of(1990, 5, 5));
        patient1.setAddress("Address 1");
        patient1.setUser(user1);

        Patient patient2 = new Patient();
        patient2.setBirthDate(LocalDate.of(1995, 6, 6));
        patient2.setAddress("Address 2");
        patient2.setUser(user2);

        patientRepository.saveAll(List.of(patient1, patient2));

        // when
        List<Patient> patients = patientRepository.findAll();

        // then
        assertThat(patients).hasSize(2);
    }

    @Test
    void testDelete() {
        // given
        UserEntity user = new UserEntity();
        user.setEmail("deletePatient@example.com");
        user.setRole(UserRole.PATIENT);
        entityManager.persist(user);

        Patient patient = new Patient();
        patient.setBirthDate(LocalDate.of(1985, 12, 12));
        patient.setAddress("Delete Street");
        patient.setUser(user);

        Patient savedPatient = patientRepository.save(patient);

        // when
        patientRepository.delete(savedPatient);

        // then
        Optional<Patient> foundPatient = patientRepository.findById(savedPatient.getId());
        assertThat(foundPatient).isNotPresent();
    }
}
