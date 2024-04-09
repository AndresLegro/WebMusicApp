package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistSongId {

    @Column(name = "id_playlist")
    private Integer playlistId;

    @Column(name = "id_song")
    private String songId;
}
