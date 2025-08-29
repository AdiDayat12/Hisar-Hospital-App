package com.hisarhospital.hisar_hospital_api.dto.response;

import lombok.*;

/**
 * @author adilinan
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DoctorResponse extends UserResponse {
    private String qualification;
    private String specialization;
    private String bio;
    private String practiceLocation;
    private String photoUrl;
}
