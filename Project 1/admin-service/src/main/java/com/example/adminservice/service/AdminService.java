package com.example.adminservice.service;

import com.example.adminservice.Dao.AdminRepository;
import com.example.adminservice.entity.AdminAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<AdminAccess> getAdmins(){
        return adminRepository.findAll();
    }

    public AdminAccess createAdmin(AdminAccess adminAccess){
        adminAccess.setAdminPassword(passwordEncoder.encode(adminAccess.getPassword()));
        return adminRepository.save(adminAccess);
    }

}
