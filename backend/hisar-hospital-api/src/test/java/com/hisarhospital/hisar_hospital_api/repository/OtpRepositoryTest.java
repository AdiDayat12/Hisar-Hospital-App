package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.OtpToken;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@DataJpaTest
@ActiveProfiles("test")
class OtpRepositoryTest {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private TestEntityManager entityManager; // biar bisa persist UserEntity langsung

    @Test
    void testSaveAndFindByUser() {
        // given: buat user dulu
        UserEntity user = new UserEntity();
        user.setEmail("otpuser@example.com");
        user.setRole(UserRole.PATIENT);
        entityManager.persist(user);

        // lalu buat OTP token
        OtpToken otp = new OtpToken();
        otp.setOtpCode("123456");
        otp.setUser(user);
        otpRepository.save(otp);

        // when
        Optional<OtpToken> foundOtp = otpRepository.findByUser(user);

        // then
        assertThat(foundOtp).isPresent();
        assertThat(foundOtp.get().getOtpCode()).isEqualTo("123456");
    }

    @Test
    void testDelete() {
        // given: buat user + otp
        UserEntity user = new UserEntity();
        user.setEmail("deleteuser@example.com");
        user.setRole(UserRole.PATIENT);
        entityManager.persist(user);

        OtpToken otp = new OtpToken();
        otp.setOtpCode("654321");
        otp.setUser(user);
        otp = otpRepository.save(otp);

        // pastikan ada di DB
        assertThat(otpRepository.findById(otp.getId())).isPresent();

        // when: delete
        otpRepository.delete(otp);

        // then
        assertThat(otpRepository.findById(otp.getId())).isNotPresent();
    }
}
