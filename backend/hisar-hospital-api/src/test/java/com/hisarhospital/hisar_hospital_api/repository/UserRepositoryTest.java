package com.hisarhospital.hisar_hospital_api.repository;

import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


/**
 * @author adilinan
 */
@ActiveProfiles("test")
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByEmail() {
        // given
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setRole(UserRole.ADMIN);
        userRepository.save(user);

        // when
        Optional<UserEntity> foundUser = userRepository.findByEmail("test@example.com");

        // then
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testFindByRole() {
        // given
        UserEntity user1 = new UserEntity();
        user1.setEmail("admin1@example.com");
        user1.setRole(UserRole.ADMIN);

        UserEntity user2 = new UserEntity();
        user2.setEmail("admin2@example.com");
        user2.setRole(UserRole.ADMIN);

        UserEntity user3 = new UserEntity();
        user3.setEmail("user@example.com");
        user3.setRole(UserRole.PATIENT);

        userRepository.saveAll(List.of(user1, user2, user3));

        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<UserEntity> admins = userRepository.findByRole(UserRole.ADMIN, pageable);

        // then
        assertThat(admins.getTotalElements()).isEqualTo(2);
        assertThat(admins.getContent())
                .extracting(UserEntity::getRole)
                .containsOnly(UserRole.ADMIN);
    }
}
