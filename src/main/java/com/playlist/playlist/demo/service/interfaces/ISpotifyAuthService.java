package com.playlist.playlist.demo.service.interfaces;

public interface ISpotifyAuthService {

    String getAthorizationUrl();
    String getTokenResponse(String code);
    public void saveAccessToken(String token);
    public void clearAccessToken();

}
