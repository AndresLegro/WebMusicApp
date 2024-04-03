package com.playlist.playlist.demo.commons;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class Endpoints {

    public final String SEARCH = "https://api.spotify.com/v1/search";

    private final String SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

    private final String SPOTIFY_GET_SONG = "https://api.spotify.com/v1/tracks/";


}
