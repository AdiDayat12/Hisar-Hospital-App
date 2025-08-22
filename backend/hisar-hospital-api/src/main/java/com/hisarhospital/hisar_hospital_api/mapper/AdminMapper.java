package com.hisarhospital.hisar_hospital_api.mapper;

import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.request.PatientRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.dto.response.PatientResponse;
import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.entity.Patient;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author adilinan
 */


@Mapper(componentModel = "spring")
public interface AdminMapper {
    // Mapping ke UserEntity (field dokter diabaikan)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "ADMIN") // set role otomatis
    @Mapping(target = "isAccountVerified", constant = "true")
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", constant = "ACTIVE")
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "admin", ignore = true)
    @Mapping(target = "superAdmin", ignore = true)
    UserEntity toUserEntity(AdminRequest request);

    @Mapping(target = "id", ignore = true)
    Admin toAdmin (AdminRequest request);

    @Mapping(target = "id", source = "user.id")
    AdminResponse toAdminResponse (UserEntity user, Admin admin);
}