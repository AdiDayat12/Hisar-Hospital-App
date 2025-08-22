package com.hisarhospital.hisar_hospital_api.dto.request;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
/**
 * @author adilinan
 */

@Data
public class AppointmentRequest {
    private Long doctorId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
}