package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.dto.UserDto;
import com.playlist.playlist.demo.service.impl.LogInService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping("")
public class LogInController {

    LogInService logInService;

    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<String> logIn (@RequestBody UserDto user){
        return new ResponseEntity<>(logInService.logIn(user), HttpStatus.OK);
    }

    @PostMapping("/createUser")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<String> createUser (@RequestBody UserDto user){
        return new ResponseEntity<>(logInService.createUser(user), HttpStatus.CREATED);
    }

    @PutMapping("/resetPassword")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<String> resetPassword (@RequestBody UserDto user){
        return new ResponseEntity<>(logInService.resetPassword(user), HttpStatus.OK);
    }
}
