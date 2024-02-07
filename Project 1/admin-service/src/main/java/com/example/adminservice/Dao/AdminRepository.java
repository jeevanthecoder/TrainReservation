package com.example.adminservice.Dao;

import com.example.adminservice.entity.AdminAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface AdminRepository extends JpaRepository<AdminAccess,Integer> {


    public AdminAccess findAdminAccessByAdminName(final String adminEmail);


}
