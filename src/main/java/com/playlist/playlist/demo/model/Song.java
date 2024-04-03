package com.playlist.playlist.demo.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class Song {

    private String id;
    private String name;
}
