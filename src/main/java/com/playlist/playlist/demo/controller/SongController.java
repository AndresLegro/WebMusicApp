package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.service.impl.SportifySongsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/songs")
public class SongController {

    SportifySongsService service;

    public SongController (SportifySongsService service){
        this.service = service;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<String> getSong (String query){
        return new ResponseEntity<>(service.getSong("Do I Wanna Know"), HttpStatus.OK);
    }
}
