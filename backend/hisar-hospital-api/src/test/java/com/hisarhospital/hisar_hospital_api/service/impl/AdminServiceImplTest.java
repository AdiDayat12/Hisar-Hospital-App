package com.hisarhospital.hisar_hospital_api.service.impl;
import com.hisarhospital.hisar_hospital_api.dto.request.AdminRequest;
import com.hisarhospital.hisar_hospital_api.dto.response.AdminResponse;
import com.hisarhospital.hisar_hospital_api.entity.Admin;
import com.hisarhospital.hisar_hospital_api.entity.UserEntity;
import com.hisarhospital.hisar_hospital_api.enums.UserRole;
import com.hisarhospital.hisar_hospital_api.mapper.AdminMapper;
import com.hisarhospital.hisar_hospital_api.repository.AdminRepository;
import com.hisarhospital.hisar_hospital_api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;


/**
 * @author adilinan
 */

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AdminServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AdminMapper adminMapper;

    @InjectMocks
    private AdminServiceImpl adminService;

    private UserEntity user;
    private Admin admin;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        admin = new Admin();
        admin.setDepartment("IT");
        admin.setPhoneExtension("123");

        user = new UserEntity();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        user.setPhone("111-222");
        user.setPassword("encodedPass");
        user.setRole(UserRole.ADMIN);
        user.setAdmin(admin);
    }

    @Test
    void testUpdateAdmin_Success() {
        AdminRequest request = new AdminRequest();
        request.setFirstName("Jane");
        request.setLastName("Smith");
        request.setPhone("999-888");
        request.setPassword("newPass");
        request.setDepartment("HR");
        request.setPhoneExtension("456");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newPass")).thenReturn("encodedNewPass");
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);

        AdminResponse expectedResponse = new AdminResponse();
        expectedResponse.setFirstName("Jane");
        expectedResponse.setLastName("Smith");
        expectedResponse.setEmail("john@example.com");
        expectedResponse.setDepartment("HR");
        expectedResponse.setPhoneExtension("456");

        when(adminMapper.toAdminResponse(any(UserEntity.class), any(Admin.class)))
                .thenReturn(expectedResponse);

        AdminResponse response = adminService.updateAdmin(1L, request);

        assertEquals("Jane", response.getFirstName());
        assertEquals("HR", response.getDepartment());
        verify(userRepository).save(any(UserEntity.class));
    }

    @Test
    void testFindAdminById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        AdminResponse expectedResponse = new AdminResponse();
        expectedResponse.setFirstName("John");
        expectedResponse.setDepartment("IT");
        expectedResponse.setPhoneExtension("123");

        when(adminMapper.toAdminResponse(user, admin)).thenReturn(expectedResponse);

        AdminResponse response = adminService.findAdminById(1L);

        assertEquals("John", response.getFirstName());
        assertEquals("IT", response.getDepartment());
    }

    @Test
    void testFindAdminById_NotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> adminService.findAdminById(99L));

        assertEquals("Not found", ex.getMessage());
    }

    @Test
    void testFindAdminById_NotAdmin() {
        user.setRole(UserRole.PATIENT);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> adminService.findAdminById(1L));

        assertEquals("Not admin", ex.getMessage());
    }

    @Test
    void testDeleteAdmin_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        adminService.deleteAdmin(1L);

        verify(adminRepository).delete(admin);
        verify(userRepository).delete(user);
    }

    @Test
    void testDeleteAdmin_NotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> adminService.deleteAdmin(99L));

        assertEquals("not found", ex.getMessage());
    }
}
