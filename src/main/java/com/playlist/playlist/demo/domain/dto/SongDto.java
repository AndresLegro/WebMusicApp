package com.playlist.playlist.demo.domain.dto;

import com.playlist.playlist.demo.domain.entity.SongEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SongDto {
    private String idSong;
    private String name;
    private String author;
    private String album;
    private String duration;
    private String image;
}
