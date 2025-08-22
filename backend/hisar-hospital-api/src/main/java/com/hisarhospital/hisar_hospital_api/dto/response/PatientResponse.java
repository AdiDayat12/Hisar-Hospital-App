package com.hisarhospital.hisar_hospital_api.dto.response;

import com.hisarhospital.hisar_hospital_api.enums.Gender;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

/**
 * @author adilinan
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PatientResponse extends UserResponse {
    private LocalDate birthDate;
    private String address;
}

