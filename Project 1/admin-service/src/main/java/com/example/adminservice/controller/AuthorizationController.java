package com.example.adminservice.controller;

import com.example.adminservice.entity.AdminAccess;
import com.example.adminservice.models.JwtRequest;
import com.example.adminservice.models.JwtResponse;
import com.example.adminservice.security.JwtHelper;
import com.example.adminservice.service.AdminService;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthorizationController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthorizationController.class);

    @Autowired
    private AdminService adminService;

    @RequestMapping(value = "/login-admin",method = {RequestMethod.POST,RequestMethod.GET})
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        String message=this.doAuthenticate(request.getAdminEmail(), request.getAdminPassword());

        if(message.length()>1){
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getAdminEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .Admin_Email(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private String doAuthenticate(String userName, String password) {

        String message="";
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userName, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            message=e.toString();
            return message;
//            throw new BadCredentialsException(" Invalid Admin_name or Password  !!");
        }
return message;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PostMapping("/create-admin")
    public AdminAccess createUser(@RequestBody AdminAccess adminAccess){
        return adminService.createAdmin(adminAccess);
    }


}
