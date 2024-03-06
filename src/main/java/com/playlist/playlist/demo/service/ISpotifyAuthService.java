package com.playlist.playlist.demo.service;

import com.playlist.playlist.demo.model.AccessTokenResponse;

public interface ISpotifyAuthService {

    String getAthorizationUrl();
    String getTokenResponse(String code);
    public void saveAccessToken(String token);
    public void clearAccessToken();

}
