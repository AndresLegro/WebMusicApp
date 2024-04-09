package com.playlist.playlist.demo.service.impl;
import com.playlist.playlist.demo.commons.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.*;
import org.springframework.web.client.RestTemplate;

import org.springframework.beans.factory.annotation.Value;
import com.playlist.playlist.demo.configuration.AccessTokenResponse;
import com.playlist.playlist.demo.service.interfaces.ISpotifyAuthService;


@Service
public class SpotifyAuthServiceImpl implements ISpotifyAuthService {

    @Value("${spotify.api.client-id}")
    private String clientId;

    @Value("${spotify.api.client-secret}")
    private String clientSecret;

    @Value("${spotify.api.redirect-uri}")
    private String redirectUri;

    @Value("${spotify.api.base-url}")
    private String apiUrl;

    @Autowired
    Endpoints endpoints;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    AccessTokenResponse accessTokenResponse;


    @Override
    public String getAthorizationUrl() {
         return "https://accounts.spotify.com/authorize" +
                "?client_id=" + clientId +
                "&response_type=code" +
                "&redirect_uri=" + redirectUri +
                "&scope=user-read-private user-read-email playlist-read-private";
    }

    @Override
    public String getTokenResponse(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("code", code);
        requestBody.add("redirect_uri", redirectUri);
        requestBody.add("client_id", clientId);
        requestBody.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<AccessTokenResponse> responseEntity = restTemplate.exchange(
                endpoints.getSPOTIFY_TOKEN_URL(),
                HttpMethod.POST,
                requestEntity,
                AccessTokenResponse.class
        );

        if (!responseEntity.getHeaders().getContentType().includes(MediaType.APPLICATION_JSON)) {
            System.out.println("Error en la petición de token de Spotify");
            return null;
        } else {
            String pruebaBody = String.valueOf(responseEntity.getBody());
            AccessTokenResponse responseBody = responseEntity.getBody();
            saveAccessToken(responseBody.getAccessToken());
            return responseBody.getAccessToken();
        }

    }

    @Override
    public void saveAccessToken(String code) {
        accessTokenResponse.setAccessToken(code);
    }

    @Override
    public void clearAccessToken() {
        accessTokenResponse.setAccessToken(null);
    }
}