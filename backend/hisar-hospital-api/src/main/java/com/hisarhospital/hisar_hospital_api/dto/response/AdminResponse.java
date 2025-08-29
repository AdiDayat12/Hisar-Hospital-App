package com.hisarhospital.hisar_hospital_api.dto.response;

import lombok.*;

/**
 * @author adilinan
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminResponse extends UserResponse{
    private String department;
    private String phoneExtension;

}
