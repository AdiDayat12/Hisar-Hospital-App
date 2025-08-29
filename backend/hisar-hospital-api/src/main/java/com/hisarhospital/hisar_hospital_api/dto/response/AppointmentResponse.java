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
    private Long doctorId;
    private Long patientId;
    private String patientName;
    private String doctorName;
    private String specialization;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private String notes;
}
