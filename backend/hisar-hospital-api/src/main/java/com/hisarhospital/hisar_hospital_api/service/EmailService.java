package com.hisarhospital.hisar_hospital_api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * @author adilinan
 */

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendOtpEmail (String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome to Hisar Hospital\n");
        message.setText("Thank you for signing up. To complete your registration, please verify your email address.\n" +
                "Your verification code is:" + otp + "\n" +
                "This code will expire in 15 minutes.\n" +
                        "If you didn't create an account with us, please ignore this email.");
        mailSender.send(message);
    }

    public void sendResetOtp (String toEmail, String username, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setSubject("Reset Password OTP");
        message.setText(
                "Hello " + username + ",\n\n" +
                        "You requested to reset your account password. Please use the following OTP to proceed:\n\n" +
                        "OTP Code: " + otp + "\n\n" +
                        "This code is valid for 5 minutes. Do not share it with anyone.\n\n" +
                        "If you did not request a password reset, please ignore this email.\n\n" +
                        "Thank you,\n" +
                        "The IT Team"
        );
        message.setTo(toEmail);
        mailSender.send(message);

    }
}
