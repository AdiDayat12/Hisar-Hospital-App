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
    private String phone;
    private String specialization;
    private int experienceYears;
    private String qualification;
    private String photoUrl;
}
