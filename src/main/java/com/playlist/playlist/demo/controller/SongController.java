package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.exception.ErrorResponse;
import com.playlist.playlist.demo.service.impl.SpotifySongsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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

    @Operation(summary = "Allow to save a song in data base as 'Favorite' using the spotify api data ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the song's information in JSON ", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SongDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @PostMapping(value = "/saveAsFavorite/{idSong}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<SongEntity> saveSong (@PathVariable String idSong){
        return new ResponseEntity<>(service.saveSong(idSong), HttpStatus.OK);
    }

    @Operation(summary = "Allow to get the song's information saved as 'Favorite' from data base")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the song's information in JSON ", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SongDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "409", description = "The song is not saved as Favorite", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @GetMapping("/get/{songName}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public  ResponseEntity<List<SongDto>> getSong(@PathVariable String songName){
        return new ResponseEntity<>(service.getSong(songName),HttpStatus.OK);
    }
}
