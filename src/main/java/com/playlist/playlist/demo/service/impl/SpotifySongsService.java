package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.commons.Endpoints;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.repository.SongRepository;
import com.playlist.playlist.demo.service.interfaces.ISpotifySongService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@AllArgsConstructor
public class SpotifySongsService implements ISpotifySongService {

    Endpoints endpoints;
    SpotifySearchServiceImpl search;
    SongRepository repository;

    @Override
    public SongEntity saveSong(String songToSearch, int selectedSongIndex) {
        Map<String, Object> response = search.searchSong(songToSearch);

        try {
            if (response.containsKey("tracks")) {
                Map<String, Object> tracksMap = (Map<String, Object>) response.get("tracks");

                if (tracksMap != null) {
                    List<Map<String, Object>> itemsList = (List<Map<String, Object>>) tracksMap.get("items");

                    // Usar Optional para obtener el elemento seleccionado por su índice
                    Optional<Map<String, Object>> selectedSong = itemsList.stream()
                            .skip(selectedSongIndex - 1) // Restar 1 porque los índices comienzan en 0
                            .findFirst();

                    if (selectedSong.isPresent()) {
                        Map<String, Object> item = selectedSong.get();

                        String idTrack = (String) item.get("id");
                        String nameTrack = (String) item.get("name");
                        long durationTrack = (int) item.get("duration_ms");

                        // Convertir la duración de milisegundos a minutos:segundos
                        long minutes = durationTrack / 60000;
                        long remainingSeconds = (durationTrack % 60000) / 1000;
                        String formattedDuration = String.format("%d:%02d", minutes, remainingSeconds);

                        String authorTrack = "";
                        String albumTrack = "";
                        String imageTrack = "";

                        List<Map<String, Object>> artistList = (List<Map<String, Object>>) item.get("artists");
                        if (!artistList.isEmpty()) {
                            authorTrack = (String) artistList.get(0).get("name");
                        }

                        Map<String, Object> albumMap = (Map<String, Object>) item.get("album");
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

                        return repository.save(songToSave);

                    } else {
                        throw new RuntimeException("No se encontró la canción seleccionada en la respuesta");
                    }
                }
            }
            throw new RuntimeException("No se encontraron canciones en la respuesta");

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la canción: " + e.getMessage(), e);
        }

    }

    @Override
    public Optional<SongEntity> getSong(String idSong) {
        return Optional.ofNullable(repository.findById(idSong).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Cancion con id %s no existe", idSong))
        ));
    }

}


//    @Override
//    public SongEntity getSong(String query) {
//
//        Map<String, Object> response = search.searchSong(query);
//
//        try {
//            if (response.containsKey("tracks")) {
//                Map<String, Object> tracksMap = (Map<String, Object>) response.get("tracks");
//
//                if(tracksMap!= null){
//                    List <Map<String, Object>> itemsList = (List<Map<String, Object>>) tracksMap.get("items");
//
//                    for (Map<String,Object> item : itemsList){
//
//                        String idTrack = (String) item.get("id");
//                        String nameTrack = (String) item.get("name");
//                        int durationTrack = (int) item.get("duration_ms");
//                        long seconds = durationTrack / 1000;
//                        long minutes = seconds / 60;
//                        long remainingSeconds = seconds % 60;
//
//                        // Formatea el resultado como "minutos:segundos"
//                        String formattedDuration = String.format("%d:%02d", minutes, remainingSeconds);
//
//                        String authorTrack = null;
//                        String albumTrack =  null;
//                        String imageTrack = null;
//
//                        List <Map<String, Object>> artistList = (List<Map<String, Object>>) item.get("artists");
//
//                        for (Map<String,Object> artist : artistList){
//                             authorTrack = (String) artist.get("name");
//                        }
//
//                        Map<String, Object> albumMap = (Map<String, Object>) item.get("album");
//                        for (Map.Entry<String,Object> album : albumMap.entrySet()){
//                            String key = album.getKey();
//                            Object value = album.getValue();
//
//                            if("name".equals(key)){
//                                albumTrack = (String) value;
//                            }
//
//                            if("images".equals(key)){
//                                List <Map<String, Object>> imagesList = (List<Map<String, Object>>) value;
//
//                                for (Map<String,Object> image : imagesList){
//                                    imageTrack = (String) image.get("url");
//                                }
//                            }
//                        }
//                        System.out.println("ID de la canción: " + idTrack);
//                        return SongEntity.builder()
//                                .idSong(idTrack)
//                                .name(nameTrack)
//                                .author(authorTrack)
//                                .album(albumTrack)
//                                .duration(formattedDuration)
//                                .image(imageTrack)
//                                .build();
//                    }
//                }
//
//            }
//            throw new Exception("No se encontraron canciones en la respuesta");
//
//        } catch (Exception e) {
//            throw new RuntimeException("Error al obtener la canción: " + e.getMessage(), e);
//        }