package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author adilinan
 */

@DataJpaTest
@ActiveProfiles("test")
class AdminRepositoryTest {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void testSaveAndFindById() {
        // given: persist user dulu
        UserEntity user = new UserEntity();
        user.setEmail("admin@example.com");
        user.setRole(UserRole.ADMIN);
        entityManager.persist(user);

        // buat admin yang terhubung ke user
        Admin admin = new Admin();
        admin.setUser(user);

        Admin savedAdmin = adminRepository.save(admin);

        // when
        Optional<Admin> foundAdmin = adminRepository.findById(savedAdmin.getId());

        // then
        assertThat(foundAdmin).isPresent();
        assertThat(foundAdmin.get().getUser().getEmail()).isEqualTo("admin@example.com");
    }

    @Test
    void testDelete() {
        // given
        UserEntity user = new UserEntity();
        user.setEmail("deleteAdmin@example.com");
        user.setRole(UserRole.ADMIN);
        entityManager.persist(user);

        Admin admin = new Admin();
        admin.setUser(user);
        Admin savedAdmin = adminRepository.save(admin);

        // when
        adminRepository.delete(savedAdmin);

        // then
        Optional<Admin> foundAdmin = adminRepository.findById(savedAdmin.getId());
        assertThat(foundAdmin).isNotPresent();
    }
}
