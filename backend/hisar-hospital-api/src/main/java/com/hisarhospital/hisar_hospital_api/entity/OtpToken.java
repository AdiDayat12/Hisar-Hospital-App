package com.hisarhospital.hisar_hospital_api.entity;

import com.hisarhospital.hisar_hospital_api.enums.OtpPurpose;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author adilinan
 */

@Entity
@Table(name = "otp_tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String otpCode;
    @Enumerated(EnumType.STRING)
    private OtpPurpose otpPurpose;
    private LocalDateTime expiryTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
