package com.playlist.playlist.demo.domain.dto;

import com.playlist.playlist.demo.domain.entity.SongEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class PlaylistDto {

    private int id;
    private String name;
    private String author;
    private String description;
    private int songsAmount;
    private String image;
    private List<SongDto> songs;

}
