package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.service.impl.SpotifyAuthServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/spotify")
public class AuthController {


    SpotifyAuthServiceImpl serviceAuth;

    public AuthController (SpotifyAuthServiceImpl serviceAuth){
        this.serviceAuth = serviceAuth;
    }

    @Operation(summary = "Allow to log in the Spotify services",
            description = "If you don't log in, there are some functions that you can't use")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Log in the Spotify services and get the token access"),
            @ApiResponse(responseCode = "404", description = "The user doesn't exist in Spotify and can't get the access token")
    })
    @GetMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public void login (HttpServletResponse response) throws IOException {
        String authorizationUrl = serviceAuth.getAthorizationUrl();
        response.sendRedirect(authorizationUrl);
    }

    @GetMapping("/redirect")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> getTokenResponse (@RequestParam("code") String code, HttpServletResponse response ){
        String tokenResponse = serviceAuth.getTokenResponse(code);

        if (tokenResponse != null) {
            return new ResponseEntity<>("Has iniciado sesion correctamente, puedes volver a la pagina de nuevo", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error al obtener el token de acceso", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getToken")
    @CrossOrigin(origins = "http://localhost:3000")
    public Optional<String> getAccessToken(){
       return serviceAuth.getAccessToken();
    }

}
