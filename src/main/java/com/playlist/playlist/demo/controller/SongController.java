package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.service.impl.SpotifySongsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/songs")
public class SongController {

    SpotifySongsService service;

    public SongController (SpotifySongsService service){
        this.service = service;
    }

    @Operation(summary = "Allow to save a song in data base from a spotify api ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the song's information in JSON "),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify"),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing")
            }
    )
    @PostMapping(value = "/save/{idSong}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<SongEntity> saveSong (@PathVariable String idSong){
        return new ResponseEntity<>(service.saveSong(idSong), HttpStatus.OK);
    }

    @Operation(summary = "Allow to get the song's information from data base")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the song's information in JSON "),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify"),
                    @ApiResponse(responseCode = "400", description = "Searching parameter is missing")
            }
    )
    @GetMapping("/get/{songName}")
    @CrossOrigin(origins = "http://localhost:3000")
    public  ResponseEntity<List<SongDto>> getSong(@PathVariable String songName){
        return new ResponseEntity<>(service.getSong(songName),HttpStatus.OK);
    }
}
