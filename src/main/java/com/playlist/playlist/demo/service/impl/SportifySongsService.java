package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.commons.Endpoints;
import com.playlist.playlist.demo.model.Song;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class SportifySongsService {


    Endpoints endpoints;
    Song song;
    SpotifySearchServiceImpl search;

    public String getSong(String query) {

        Map<String, Object> response = search.searchSong(query);

        try {
            if (response.containsKey("tracks")) {
                Map<String, Object> tracksMap = (Map<String, Object>) response.get("tracks");

                if(tracksMap!= null){
                    List <Map<String, Object>> itemsList = (List<Map<String, Object>>) tracksMap.get("items");
                    for (Map<String,Object> item : itemsList){
                        String idTrack = (String) item.get("id");
                        System.out.println("ID de la canción: " + idTrack);
                        return idTrack;
                    }
                }

            }
            throw new Exception("No se encontraron canciones en la respuesta");

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la canción: " + e.getMessage(), e);
        }
    }



}
