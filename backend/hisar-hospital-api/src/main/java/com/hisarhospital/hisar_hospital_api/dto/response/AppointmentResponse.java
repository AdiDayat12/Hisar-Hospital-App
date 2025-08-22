package com.hisarhospital.hisar_hospital_api.dto.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
/**
 * @author adilinan
 */



@Data
public class AppointmentResponse {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private String patientName;
    private String doctorName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
}
