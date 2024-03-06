package com.playlist.playlist.demo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AccessTokenResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("expires_in")
    private int expiresIn;

}
