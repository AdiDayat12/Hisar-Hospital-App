package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author adilinan
 */
@Repository
public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Long> {

}
