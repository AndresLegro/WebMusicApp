package com.playlist.playlist.demo.service.interfaces;

import java.util.List;
import java.util.Map;

public interface ISpotifyServiceSearch {

    List<Map<String, Object>> searchSong(String query);
}
