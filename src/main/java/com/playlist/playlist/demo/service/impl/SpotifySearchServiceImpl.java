package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.commons.Endpoints;
import com.playlist.playlist.demo.model.AccessTokenResponse;
import com.playlist.playlist.demo.service.ISpotifyServiceSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class SpotifySearchServiceImpl implements ISpotifyServiceSearch {

    @Autowired
    Endpoints endpoints;

    @Autowired
    AccessTokenResponse accessTokenResponse;

    @Autowired
    private RestTemplate restTemplate;


    @Override
    public Map<String, Object> searchSong(String query) {

        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

        // Configurar los parámetros de búsqueda
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("q", encodedQuery);
        queryParams.add("type", "track");
        queryParams.add("market", "ES");
        queryParams.add("limit", "1");
        queryParams.add("offset", "0");
        queryParams.add("include_external", "audio");

        // Construir la URL con los parámetros usando UriComponentsBuilder
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(endpoints.getSEARCH())
                .queryParams(queryParams);

        // Configurar las cabeceras de la solicitud con el token de acceso
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessTokenResponse.getAccessToken());

        // Configurar la entidad de la solicitud
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        // Construir la URL final
        String urlWithParams = builder.toUriString();

        System.out.println("endpoint construido = " + urlWithParams);

        // Hacer la solicitud a Spotify API
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                urlWithParams,
                HttpMethod.GET,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        return responseEntity.getBody();
    }
}
