package com.hisarhospital.hisar_hospital_api.mapper;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

/**
 * @author adilinan
 */

@Mapper(componentModel = "spring")
public interface PatientMapper {
    // Mapping ke UserEntity (field dokter diabaikan)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "PATIENT") // set role otomatis
    @Mapping(target = "isAccountVerified", constant = "true")
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", constant = "ACTIVE")
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "admin", ignore = true)
    @Mapping(target = "superAdmin", ignore = true)
    UserEntity toUserEntity(PatientRequest request);

    @Mapping(target = "id", ignore = true)
    Patient toPatient (PatientRequest request);

    @Mapping(target = "id", source = "user.id")
    PatientResponse toPatientResponse (UserEntity user, Patient patient);
}
