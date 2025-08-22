package com.hisarhospital.hisar_hospital_api.dto.response;

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
public class AdminResponse extends UserResponse{
    private String department;
    private String phoneExtension;
}
