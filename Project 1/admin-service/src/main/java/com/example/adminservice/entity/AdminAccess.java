package com.example.adminservice.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jdk.jfr.Name;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(name = "ADMIN")
public class AdminAccess implements UserDetails {

    @Id
    @GeneratedValue
    private int a_id;

    @Column(unique = true)
    @Name("adminId")
    public String adminId;

    @Column(unique = true)
    @Name("adminName")
    public String adminName;

    @Name("adminPassword")
    public String adminPassword;

    @Column(unique = true)
    @Pattern(regexp = "[A-Za-z0-9._]+@[A-Za-z0-9]+\\.[A-Z|a-z]{2,}")
    @Name("adminEmail")
    public String adminEmail;

    @Column(unique = true)
    @Name("Organization")
    public String Organization;

    @OneToMany(cascade = CascadeType.MERGE)
    @JsonManagedReference
    private Set<TrainDetails> trainDetails;

    public Set<TrainDetails> getTrainDetails() {
        return trainDetails;
    }

    public AdminAccess setTrainDetails(Set<TrainDetails> trainDetails) {
        this.trainDetails = trainDetails;
        return this;
    }

    public String getOrganization() {
        return Organization;
    }

    public AdminAccess setOrganization(String organization) {
        Organization = organization;
        return this;
    }

    public AdminAccess() {
    }

    public AdminAccess(int a_id, String admin_Id, String adminName, String adminPassword, String adminEmail, String organization) {
        this.a_id = a_id;
        this.adminId = admin_Id;
        this.adminName = adminName;
        this.adminPassword = adminPassword;
        this.adminEmail = adminEmail;
        this.Organization=organization;
    }

    public int getA_id() {
        return a_id;
    }

    public AdminAccess setA_id(int a_id) {
        this.a_id = a_id;
        return this;
    }

    public String getAdminId() {
        return adminId;
    }

    public AdminAccess setAdminId(String adminId) {
        this.adminId = adminId;
        return this;
    }

    public String getAdminName() {
        return adminName;
    }

    public AdminAccess setAdminName(String adminName) {
        this.adminName = adminName;
        return this;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public AdminAccess setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
        return this;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public AdminAccess setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.adminPassword;
    }

    @Override
    public String getUsername() {
        return this.adminName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
