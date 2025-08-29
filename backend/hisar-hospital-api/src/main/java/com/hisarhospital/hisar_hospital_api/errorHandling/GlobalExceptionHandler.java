package com.hisarhospital.hisar_hospital_api.errorHandling;

import com.hisarhospital.hisar_hospital_api.dto.ApiResponse;
import com.hisarhospital.hisar_hospital_api.exception.InvalidAppointmentDateException;
import com.hisarhospital.hisar_hospital_api.exception.OtpInvalidException;
import com.hisarhospital.hisar_hospital_api.exception.SlotNotAvailableException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author adilinan
 */

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SlotNotAvailableException.class)
    ResponseEntity<ApiResponse<?>> slotNotAvailable (SlotNotAvailableException slotNotAvailableException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ApiResponse.builder()
                                .message(slotNotAvailableException.getMessage())
                                .data(null)
                                .status(401)
                                .build()
                );
    }

    @ExceptionHandler(InvalidAppointmentDateException.class)
    ResponseEntity<ApiResponse<?>> invalidDate (InvalidAppointmentDateException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ApiResponse.builder()
                                .message(e.getMessage())
                                .data(null)
                                .status(401)
                                .build()
                );
    }

    @ExceptionHandler(OtpInvalidException.class)
    ResponseEntity<ApiResponse<?>> invalidOtp (OtpInvalidException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ApiResponse.builder()
                                .message(e.getMessage())
                                .data(null)
                                .status(401)
                                .build()
                );
    }
}
