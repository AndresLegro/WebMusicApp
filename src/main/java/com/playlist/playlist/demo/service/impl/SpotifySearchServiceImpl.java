package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.commons.Endpoints;
import com.playlist.playlist.demo.configuration.AccessTokenResponse;
import com.playlist.playlist.demo.service.interfaces.ISpotifyServiceSearch;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SpotifySearchServiceImpl implements ISpotifyServiceSearch {

    Endpoints endpoints;

    AccessTokenResponse accessTokenResponse;

    private RestTemplate restTemplate;


    @Override
    public List<Map<String, Object>> searchSong(String query) {

        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

        // Configurar los parámetros de búsqueda
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("q", encodedQuery);
        queryParams.add("type", "track");
        queryParams.add("market", "ES");
        queryParams.add("limit", "10");
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

        // Hacer la solicitud a Spotify API
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                urlWithParams,
                HttpMethod.GET,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        try{
            Map<String, Object> entityBody = responseEntity.getBody();

            if (entityBody.containsKey("tracks")) {
                Map<String, Object> tracksMap = (Map<String, Object>) entityBody.get("tracks");

                if (tracksMap != null) {
                    return (List<Map<String, Object>>) tracksMap.get("items");
                }
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"No se pudo obtener la respuesta : " + e.getMessage());
        }


        return null;
    }


}
