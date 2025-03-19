package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.exception.ErrorResponse;
import com.playlist.playlist.demo.service.impl.SpotifySearchServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/search")
public class SearchController {

    private SpotifySearchServiceImpl searchService;
    public SearchController(SpotifySearchServiceImpl searchService) {
        this.searchService = searchService;
    }

    @Operation(summary = "Allow to search anything using the spotify api ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return a list of song related with the search", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "There is not a searching parameter", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @GetMapping("/{songToSearch}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity <List<Map<String, Object>>> search (@PathVariable String songToSearch){
        return new ResponseEntity<>(searchService.searchSong(songToSearch), HttpStatus.OK);
    }
}
