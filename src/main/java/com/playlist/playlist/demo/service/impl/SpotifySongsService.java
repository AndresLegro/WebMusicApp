package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.commons.Endpoints;
import com.playlist.playlist.demo.configuration.AccessTokenResponse;
import com.playlist.playlist.demo.domain.converter.SongConverter;
import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.repository.SongRepository;
import com.playlist.playlist.demo.service.interfaces.ISpotifySongService;
import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SpotifySongsService implements ISpotifySongService {

    Endpoints endpoints;
    SongRepository repository;
    SongConverter songConverter;

    AccessTokenResponse accessTokenResponse;
    private RestTemplate restTemplate;

    @Override
    public SongEntity saveSong(String idSong) {

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(endpoints.getSPOTIFY_GET_SONG())
                .path("/" + idSong)
                .queryParam("market" , "ES");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessTokenResponse.getAccessToken());

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        // Construir la URL final
        String urlWithParams = builder.toUriString();
        System.out.println(urlWithParams);

        // Hacer la solicitud a Spotify API
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                urlWithParams,
                HttpMethod.GET,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        try {

            Map<String, Object> response = responseEntity.getBody();

            String idTrack = (String) response.get("id");
            String nameTrack = (String) response.get("name");
            long durationTrack = (int) response.get("duration_ms");

            long minutes = durationTrack / 60000;
            long remainingSeconds = (durationTrack % 60000) / 1000;
            String formattedDuration = String.format("%d:%02d", minutes, remainingSeconds);

            String authorTrack = "";
            String albumTrack = "";
            String imageTrack = "";

            List<Map<String, Object>> artistList = (List<Map<String, Object>>) response.get("artists");
            if (!artistList.isEmpty()) {
                authorTrack = (String) artistList.get(0).get("name");
            }

            Map<String, Object> albumMap = (Map<String, Object>) response.get("album");
            if (albumMap != null) {
                albumTrack = (String) albumMap.get("name");
                List<Map<String, Object>> imagesList = (List<Map<String, Object>>) albumMap.get("images");
                if (!imagesList.isEmpty()) {
                    imageTrack = (String) imagesList.get(0).get("url");
                }
            }

            SongEntity songToSave = SongEntity.builder()
                    .idSong(idTrack)
                    .name(nameTrack)
                    .author(authorTrack)
                    .album(albumTrack)
                    .duration(formattedDuration)
                    .image(imageTrack)
                    .build();

            Optional<SongEntity> alreadyExistsInDataBase = repository.findById(songToSave.getIdSong());

            if (alreadyExistsInDataBase.isPresent()){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "La cancion ya existe en base de datos, puedes ver su informacion utilizando el metodo getSong");
            }

            return repository.save(songToSave);

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se pudo guardar la cancion");
        }

    }


    @Override
    public List<SongDto> getSong(String songName) {
        SongEntity exampleSong =  new SongEntity();
        exampleSong.setName(songName);

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        Example<SongEntity> example = Example.of(exampleSong,matcher);
        List<SongEntity> songEntities = repository.findAll(example);

        if(songEntities.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cancion no encontrada en la base de datos");
        }

        return songEntities.stream().map(songEntity -> songConverter.convertToDto(songEntity)).collect(Collectors.toList());
    }

    }

