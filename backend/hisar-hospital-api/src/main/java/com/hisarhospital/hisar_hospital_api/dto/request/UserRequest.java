package com.hisarhospital.hisar_hospital_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author adilinan
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String identityNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
