package com.example.adminservice.service;

import com.example.adminservice.Dao.AdminRepository;
import com.example.adminservice.entity.AdminAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomAdminDetailService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        AdminAccess adminAccess = adminRepository.findAdminAccessByAdminName(email);
        if(adminAccess==null){
            new RuntimeException("Admin not found!!!");
        }
        return adminAccess;
    }
}
