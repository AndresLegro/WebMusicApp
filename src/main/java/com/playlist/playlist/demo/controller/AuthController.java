package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.service.impl.SpotifyAuthServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/spotify")
public class AuthController {


    SpotifyAuthServiceImpl serviceAuth;

    public AuthController (SpotifyAuthServiceImpl serviceAuth){
        this.serviceAuth = serviceAuth;
    }

    @GetMapping("/login")
    public void login (HttpServletResponse response) throws IOException {
        String authorizationUrl = serviceAuth.getAthorizationUrl();
        response.sendRedirect(authorizationUrl);
    }

    @GetMapping("/redirect")
    public ResponseEntity<String> getTokenResponse (@RequestParam("code") String code){
        String tokenResponse = serviceAuth.getTokenResponse(code);

        if (tokenResponse != null) {
            return new ResponseEntity<>("Token de acceso obtenido: " + tokenResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error al obtener el token de acceso", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
