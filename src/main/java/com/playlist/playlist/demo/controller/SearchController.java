package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.service.impl.SpotifySearchServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Allow to search anything on spotify ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return a list of song related with the search"),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify"),
                    @ApiResponse(responseCode = "400", description = "There is not a searching parameter")
            }
    )
    @GetMapping("/{songToSearch}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity <List<Map<String, Object>>> search (@PathVariable String songToSearch){
        return new ResponseEntity<>(searchService.searchSong(songToSearch), HttpStatus.OK);
    }
}
