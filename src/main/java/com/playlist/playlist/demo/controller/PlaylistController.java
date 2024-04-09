package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.dto.PlaylistDto;
import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.service.impl.PlaylistServiceImpl;
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

    @GetMapping("/getPlaylist/{idPlaylist}")
    public ResponseEntity<Optional<PlaylistDto>> getPlaylist(@PathVariable int idPlaylist){
        return new ResponseEntity<>(service.getPlaylist(idPlaylist), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity <List<SongEntity>> createPlaylist(@RequestBody PlaylistEntity playlist){
        return new ResponseEntity<>(service.createPlaylist(playlist), HttpStatus.OK);
    }

    @PatchMapping("/update/{idPlaylist}")
    public ResponseEntity<PlaylistDto> updatePlaylist(@RequestBody PlaylistEntity playlist, @PathVariable int idPlaylist){
        return new ResponseEntity<>(service.updatePlayList(playlist,idPlaylist), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{idPlaylist}")
    public ResponseEntity<PlaylistDto> deletePlaylist(@PathVariable int idPlaylist){
        service.deletePlaylist(idPlaylist);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/addSong/{idSong}/{idPlaylist}")
    public ResponseEntity<PlaylistDto> addSongToPlaylist(@PathVariable String idSong, @PathVariable int idPlaylist){
        service.addSongToPlaylist(idSong,idPlaylist);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
