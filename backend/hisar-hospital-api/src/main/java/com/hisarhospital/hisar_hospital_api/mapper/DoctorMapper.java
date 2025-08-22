package com.hisarhospital.hisar_hospital_api.mapper;

import com.hisarhospital.hisar_hospital_api.dto.request.DoctorRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.DoctorResponse;
import com.hisarhospital.hisar_hospital_api.entity.Doctor;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    // Mapping ke UserEntity (field dokter diabaikan)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "DOCTOR") // set role otomatis
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "isAccountVerified", constant = "true")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", constant = "ACTIVE")
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "admin", ignore = true)
    @Mapping(target = "superAdmin", ignore = true)
    UserEntity toUserEntity(DoctorRequest request);

    // Mapping ke Doctor (field UserEntity diabaikan)
    @Mapping(target = "id", ignore = true)
    Doctor toDoctor(DoctorRequest request);

    @Mapping(target = "id", source = "user.id")
    DoctorResponse toDoctorResponse (UserEntity user, Doctor doctor);
}
