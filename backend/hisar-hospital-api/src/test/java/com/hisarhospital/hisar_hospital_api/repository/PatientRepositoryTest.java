package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Patient;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

//@EnableJpaRepositories(basePackages = "com.hisarhospital.hisar_hospital_api.repository")
//@EntityScan("com.hisarhospital.hisar_hospital_api.entity")
    // DataJpaTest sudah mencakup keduanya, hanya jika package berada di luar package utama kita pakai ini
@DataJpaTest
@Slf4j
@ActiveProfiles("test")
class PatientRepositoryTest {
    @Autowired
    private PatientRepository repository;
    private Long patientId;
    @Test
    void test () {
        log.warn("OMG! {}", "hello");
    }

    @BeforeEach
    void setUp () {
        Patient patient = new Patient();
        patient.setFirstName("John");
        patient.setLastName("Chena");

        repository.save(patient);
        patientId = patient.getId();
    }

    @AfterEach
    void cleanUp () {
        repository.deleteAll();
    }

    @Test
    void testSavePatient() {
        Patient newPatient = new Patient();
        newPatient.setFirstName("Jane");
        newPatient.setLastName("Doe");

        Patient savedPatient = repository.save(newPatient);

        assertNotNull(savedPatient.getId());
        assertEquals("Jane", savedPatient.getFirstName());
    }

    @Test
    void testFindAllPatients() {
        // Save another patient to ensure there's more than one
        Patient anotherPatient = new Patient();
        anotherPatient.setFirstName("Alice");
        anotherPatient.setLastName("Smith");
        repository.save(anotherPatient);

        List<Patient> patients = repository.findAll();

        assertFalse(patients.isEmpty());
        assertEquals(2, patients.size());
    }

    @Test
    void findByIdSuccess () {
        Optional<Patient> expectedPatient = repository.findById(patientId);
        assertNotNull(expectedPatient);
    }

    @Test
    void findByIdFail () {
        Optional<Patient> nonExistsPatient = repository.findById(90L);
        assertTrue(nonExistsPatient.isEmpty());
    }

    @Test
    void testUpdatePatient() {
        Optional<Patient> patientOptional = repository.findById(patientId);
        assertTrue(patientOptional.isPresent());


        Patient patientToUpdate = patientOptional.get();
        patientToUpdate.setFirstName("John");
        patientToUpdate.setLastName("Wick");

        Patient updatedPatient = repository.save(patientToUpdate);

        assertEquals("Wick", updatedPatient.getLastName());
    }

    @Test
    void testDeletePatient() {
        Optional<Patient> deletedPatient = repository.findById(1L);
        assertTrue(deletedPatient.isEmpty());
    }
}