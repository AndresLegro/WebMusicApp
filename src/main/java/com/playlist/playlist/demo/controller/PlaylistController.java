package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.dto.PlaylistDto;
import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.exception.ErrorResponse;
import com.playlist.playlist.demo.service.impl.PlaylistServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/playlist")
@AllArgsConstructor
public class PlaylistController {

    PlaylistServiceImpl service;

    @Operation(summary = "Allow to get all only one playlist's information from data base ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the playlist's information in JSON " , content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing" , content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "409", description = "The playlist does not exists" , content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @GetMapping("/getPlaylist/{idPlaylist}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<Optional<PlaylistDto>> getPlaylist(@PathVariable int idPlaylist){
        return new ResponseEntity<>(service.getPlaylist(idPlaylist), HttpStatus.OK);
    }

    @Operation(summary = "Allow to get all the playlist's information from data base ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the playlist's information in JSON " , content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify" , content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @GetMapping("/getAllPlaylist")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<Optional<List<PlaylistDto>>> getAllPlaylist(){
        return new ResponseEntity<>(service.getAllPlaylist(), HttpStatus.OK);
    }

    @Operation(summary = "Allow to create a new playlist and save it in data base")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the new playlist's information in JSON " , content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Body of playlist is missing or has incorrect format", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @PostMapping("/create")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity <List<SongEntity>> createPlaylist(@RequestBody PlaylistEntity playlist){
        return new ResponseEntity<>(service.createPlaylist(playlist), HttpStatus.CREATED);
    }

    @Operation(summary = "Allow to update a existing playlist in data base ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the updated playlist's information in JSON ", content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @PatchMapping("/update/{idPlaylist}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<PlaylistDto> updatePlaylist(@RequestBody PlaylistEntity playlist, @PathVariable int idPlaylist){
        return new ResponseEntity<>(service.updatePlayList(playlist,idPlaylist), HttpStatus.OK);
    }

    @Operation(summary = "Allow to delete a playlist in data base ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "The playlist had been deleted", content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Playlist id is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "409", description = "The playlist does not exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @DeleteMapping("/delete/{idPlaylist}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<PlaylistDto> deletePlaylist(@PathVariable int idPlaylist){
        service.deletePlaylist(idPlaylist);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Allow to add a song in a existing playlist in data base")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Return the playlist's information with the song added in JSON ", content = @Content(mediaType = "application/json", schema = @Schema(implementation = PlaylistDto.class))),
                    @ApiResponse(responseCode = "401", description = "The user is not log on Spotify", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Searching parameter are/is missing", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "409", description = "The playlist does not exists or de song's ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
                    @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            }
    )
    @PostMapping("/addSong/{idSong}/{idPlaylist}")
    @CrossOrigin(origins = {"http://localhost:3000", "https://gentle-meadow-0c609e00f.6.azurestaticapps.net"})
    public ResponseEntity<PlaylistDto> addSongToPlaylist(@PathVariable String idSong, @PathVariable int idPlaylist){
        service.addSongToPlaylist(idSong,idPlaylist);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
