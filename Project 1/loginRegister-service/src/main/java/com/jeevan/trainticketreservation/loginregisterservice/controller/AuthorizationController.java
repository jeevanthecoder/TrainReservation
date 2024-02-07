package com.jeevan.trainticketreservation.loginregisterservice.controller;

import com.jeevan.trainticketreservation.loginregisterservice.Entity.Users;
import com.jeevan.trainticketreservation.loginregisterservice.models.JwtRequest;
import com.jeevan.trainticketreservation.loginregisterservice.models.JwtResponse;
import com.jeevan.trainticketreservation.loginregisterservice.security.JwtHelper;
import com.jeevan.trainticketreservation.loginregisterservice.service.CustomUserDetailService;
import com.jeevan.trainticketreservation.loginregisterservice.service.UserService;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        String message=this.doAuthenticate(request.getUserName(), request.getUserPassword());
        if(message.length()>1){
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .userName(userDetails.getUsername()).build();


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

//            throw new BadCredentialsException(" Invalid Username or Password  !!");

        }
        return message;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PostMapping("/create-user")
    public Users createUser(@RequestBody Users user){
        return userService.createCustomer(user);
    }

}
