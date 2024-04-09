package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.service.impl.SpotifySongsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/songs")
public class SongController {

    SpotifySongsService service;

    public SongController (SpotifySongsService service){
        this.service = service;
    }

    @PostMapping(value = "/save/{songToSave}/{selectedSongIndex}")
    public ResponseEntity<SongEntity> saveSong (@PathVariable String songToSave, @PathVariable int selectedSongIndex){
        return new ResponseEntity<>(service.saveSong(songToSave, selectedSongIndex), HttpStatus.OK);
    }

    @GetMapping("/get/{idSong}")
    public  ResponseEntity<Optional<SongEntity>> getSong(@PathVariable String idSong){
        return new ResponseEntity<>(service.getSong(idSong), HttpStatus.OK);
    }
}
