package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.entity.OtpToken;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.OtpPurpose;
import com.hisarhospital.hisar_hospital_api.enums.Status;
import com.hisarhospital.hisar_hospital_api.exception.OtpInvalidException;
import com.hisarhospital.hisar_hospital_api.repository.OtpRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

/**
 * @author adilinan
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpService {
    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public String generateOtp () {
        return String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
    }

    public void sendVerificationOtp (UserEntity user) {
        String otpCode = generateOtp();
        OtpToken otpToken = new OtpToken();
        otpToken.setOtpCode(passwordEncoder.encode(otpCode));
        otpToken.setOtpPurpose(OtpPurpose.VERIFY_ACCOUNT);
        otpToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));
        otpToken.setUser(user);
        otpRepository.save(otpToken);
        emailService.sendOtpEmail(user.getEmail(), otpCode);
    }

    public void verifyOtp (String email, String otp) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("not found"));

        OtpToken otpToken = otpRepository.findByUser(existingUser)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // validate otp
        if (!passwordEncoder.matches(otp, otpToken.getOtpCode())) {
            throw new OtpInvalidException("invalid");
        }

        // validate otp expiry time
        if (otpToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("expired");
        }

        if (otpToken.getOtpPurpose().name().equals("VERIFY_ACCOUNT")) {
            existingUser.setIsAccountVerified(true);
            existingUser.setStatus(Status.ACTIVE);
        }

        // Delete otp
        otpRepository.delete(otpToken);

        userRepository.save(existingUser);

    }

    public void sendResetOtp (String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("not found"));
        String username = user.getFirstName();
        String otpCode = generateOtp();
        OtpToken otpToken = new OtpToken();
        otpToken.setOtpCode(passwordEncoder.encode(otpCode));
        otpToken.setOtpPurpose(OtpPurpose.RESET_PASSWORD);
        otpToken.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpToken.setUser(user);
        otpRepository.save(otpToken);
        emailService.sendResetOtp(user.getEmail(), username, otpCode);
        log.info("otp yang terkirim: {}", otpCode);
    }

    public void resetPassword (String email, String otp, String password) {
        verifyOtp(email, otp);
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("not found"));
        existingUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(existingUser);
    }

}
