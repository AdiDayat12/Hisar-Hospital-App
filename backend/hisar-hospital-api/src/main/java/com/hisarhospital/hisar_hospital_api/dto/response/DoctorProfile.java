package com.hisarhospital.hisar_hospital_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author adilinan
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorProfile {
    private String firstName;
    private String lastName;
    private String specialization;
    private int experienceYears;
    private String qualification;
    private String photoUrl;
}
