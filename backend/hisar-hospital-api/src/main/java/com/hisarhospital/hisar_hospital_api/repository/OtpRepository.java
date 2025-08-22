package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.OtpToken;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author adilinan
 */

public interface OtpRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByUser (UserEntity user);
    Optional<OtpToken> findByUserAndOtpPurpose (UserEntity user, OtpPurpose otpPurpose);
}
