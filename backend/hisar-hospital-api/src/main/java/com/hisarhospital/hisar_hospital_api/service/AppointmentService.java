package com.hisarhospital.hisar_hospital_api.service;

import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;

import java.time.LocalDate;
import java.util.List;

/**
 * @author adilinan
 */

public interface AppointmentService {
    AppointmentResponse createAppointment(String patientEmail, AppointmentRequest request);
    List<AppointmentResponse> getPatientAppointments(String patientEmail);
    List<AppointmentResponse> getDoctorAppointmentsByDate(String doctorEmail, LocalDate date);
    List<AppointmentResponse> getDoctorAppointments(String doctorEmail);
    AppointmentResponse getAppointment (Long id);
    void cancelAppointment (Long id);
}
