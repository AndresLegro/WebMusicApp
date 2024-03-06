package com.playlist.playlist.demo.controller;

import com.playlist.playlist.demo.service.impl.SpotifySearchServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/search")
public class SearchController {

    private SpotifySearchServiceImpl searchService;
    public SearchController(SpotifySearchServiceImpl searchService) {
        this.searchService = searchService;
    }

    @GetMapping()
    public ResponseEntity<Map<String, Object>> search (String query){
        query = "artic monkeys";
        return new ResponseEntity<>(searchService.searchSong(query), HttpStatus.OK);
    }
}
