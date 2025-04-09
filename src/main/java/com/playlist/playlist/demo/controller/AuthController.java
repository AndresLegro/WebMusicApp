package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.exception.CustomErrorCodeResponse;
import com.playlist.playlist.demo.exception.ErrorResponse;
import com.playlist.playlist.demo.service.impl.SpotifyAuthServiceImpl;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.time.LocalDateTime;
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
            @ApiResponse(responseCode = "200", description = "Log in the Spotify services and do a request to the spotify api to get the token access"),
            @ApiResponse(responseCode = "404", description = "The user doesn't exist in Spotify and can't get the access token"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/login")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public void login (HttpServletResponse response) throws IOException {
        String authorizationUrl = serviceAuth.getAthorizationUrl();
        response.sendRedirect(authorizationUrl);
    }

    @Hidden
    @GetMapping("/redirect")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<String> getTokenResponse (@RequestParam("code") String code, HttpServletResponse response ){
        String tokenResponse = serviceAuth.getTokenResponse(code);

        if (tokenResponse != null) {
            return new ResponseEntity<>("Has iniciado sesion correctamente, puedes volver a la pagina de nuevo", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error al obtener el token de acceso", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Allow to get the access token to be used for the front-end",
            description = "If you don't log in and get the token, there are some functions that you can't use")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Log in the Spotify services and get the token access", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "The user doesn't exist in Spotify and can't get the access token", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/getToken")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<Optional<?>> getAccessToken(){
        if (serviceAuth.getAccessToken().isPresent()){
            return new ResponseEntity<>(serviceAuth.getAccessToken(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
