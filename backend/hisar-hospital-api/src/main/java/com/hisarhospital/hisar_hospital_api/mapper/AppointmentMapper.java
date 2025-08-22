package com.hisarhospital.hisar_hospital_api.mapper;

import com.hisarhospital.hisar_hospital_api.dto.request.AppointmentRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AppointmentResponse;
import com.hisarhospital.hisar_hospital_api.entity.Appointment;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.enums.AppointmentStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

/**
 * @author adilinan
 */

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AppointmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "notes", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    Appointment toAppointment(AppointmentRequest request);

    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "doctor.id", target = "doctorId")
    @Mapping(source = "patient", target = "patientName", qualifiedByName = "toPatientName")
    @Mapping(source = "doctor", target = "doctorName", qualifiedByName = "toDoctorName")
    @Mapping(source = "status", target = "status", qualifiedByName = "toStatusString")
    AppointmentResponse toAppointmentResponse(Appointment appointment);

    @Named("toPatientName")
    default String toPatientName(Patient patient) {
        if (patient == null || patient.getUser() == null) {
            return null;
        }
        return patient.getUser().getFirstName() + " " + patient.getUser().getLastName();
    }

    @Named("toDoctorName")
    default String toDoctorName(Doctor doctor) {
        if (doctor == null || doctor.getUser() == null) {
            return null;
        }
        return "Dr. " + doctor.getUser().getFirstName() + " " + doctor.getUser().getLastName();
    }

    @Named("toStatusString")
    default String toStatusString(AppointmentStatus status) {
        if (status == null) {
            return null;
        }
        return status.name();
    }
}
