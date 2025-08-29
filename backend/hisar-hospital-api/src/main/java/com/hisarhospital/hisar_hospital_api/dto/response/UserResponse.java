package com.hisarhospital.hisar_hospital_api.dto.response;

import com.hisarhospital.hisar_hospital_api.enums.Status;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import lombok.*;

import java.sql.Timestamp;

/**
 * @author adilinan
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class UserResponse {
    private Long id;
    private String identityNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private UserRole role;
    private Status status;
    private Timestamp createdAt;


}
