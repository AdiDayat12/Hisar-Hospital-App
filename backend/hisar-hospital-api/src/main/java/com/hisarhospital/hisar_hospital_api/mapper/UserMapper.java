package com.hisarhospital.hisar_hospital_api.mapper;

import com.hisarhospital.hisar_hospital_api.dto.request.UserRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.UserResponse;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author adilinan
 */

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "PATIENT") // set role otomatis
    @Mapping(target = "isAccountVerified", constant = "true")
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", constant = "PENDING_VERIFICATION")
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "admin", ignore = true)
    @Mapping(target = "superAdmin", ignore = true)
    UserEntity toUserEntity (UserRequest userRequest);

    UserResponse toUserResponse (UserEntity user);
}
