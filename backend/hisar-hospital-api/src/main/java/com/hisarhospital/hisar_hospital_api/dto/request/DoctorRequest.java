package com.hisarhospital.hisar_hospital_api.dto.request;

import lombok.*;

/**
 * @author adilinan
 */


@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorRequest extends UserRequest {
    private String qualification;
    private String specialization;
    private String phone;
    private String bio;
    private String practiceLocation;
    private String photoUrl;
}
