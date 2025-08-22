package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.mysql.cj.log.Log;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@DataJpaTest
@Slf4j
class DoctorRepositoryTest {
    @Autowired
    private DoctorRepository repository;
    private Long doctorId;

    @BeforeEach
    void setUp (){
        Doctor doctor = new Doctor();
        doctor.setFirstName("John");
        doctor.setLastName("batistuta");
        doctorId = repository.save(doctor).getId();
    }

    @AfterEach
    void cleanUp () {
        repository.deleteAll();
    }


    @Test
    void testSaveDoctor() {
        Doctor newDoctor = new Doctor();
        newDoctor.setFirstName("Jane");
        newDoctor.setLastName("Doe");

        Doctor savedDoctor = repository.save(newDoctor);

        assertNotNull(savedDoctor.getId());
        assertEquals("Jane", savedDoctor.getFirstName());
    }

    @Test
    void testFindAllDoctors() {
        // Save another Doctor to ensure there's more than one
        Doctor anotherDoctor = new Doctor();
        anotherDoctor.setFirstName("Alice");
        anotherDoctor.setLastName("Smith");
        repository.save(anotherDoctor);

        List<Doctor> Doctors = repository.findAll();

        assertFalse(Doctors.isEmpty());
        assertEquals(2, Doctors.size());
    }


    @Test
    void findByIdSuccess () {
        Optional<Doctor> existDoctor = repository.findById(doctorId);
        assertTrue(existDoctor.isPresent());
    }

    @Test
    void findByIdFail () {
        log.info("Total records: {}", repository.count());
        Optional<Doctor> nonExistDoctor = repository.findById(20L);
        assertTrue(nonExistDoctor.isEmpty());
    }

    @Test
    void testUpdateDoctor() {
        Optional<Doctor> DoctorOptional = repository.findById(doctorId);
        assertTrue(DoctorOptional.isPresent());


        Doctor DoctorToUpdate = DoctorOptional.get();
        DoctorToUpdate.setFirstName("John");
        DoctorToUpdate.setLastName("Wick");

        Doctor updatedDoctor = repository.save(DoctorToUpdate);

        assertEquals("Wick", updatedDoctor.getLastName());
    }

    @Test
    void testDeleteDoctor() {
        Optional<Doctor> deletedDoctor = repository.findById(1L);
        assertTrue(deletedDoctor.isEmpty());
    }
}