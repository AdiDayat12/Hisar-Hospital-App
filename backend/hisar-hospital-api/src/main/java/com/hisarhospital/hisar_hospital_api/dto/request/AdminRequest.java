package com.hisarhospital.hisar_hospital_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author adilinan
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String department;
    private String phoneExtension;
}
