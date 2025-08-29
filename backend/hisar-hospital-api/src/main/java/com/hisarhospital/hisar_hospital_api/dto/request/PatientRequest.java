package com.hisarhospital.hisar_hospital_api.dto.request;

import lombok.*;

import java.time.LocalDate;

/**
 * @author adilinan
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientRequest extends UserRequest {
    private String phone;
    private LocalDate birthDate;
    private String address;
}
