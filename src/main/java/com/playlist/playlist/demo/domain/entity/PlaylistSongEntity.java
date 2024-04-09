package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "playlist_song")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistSongEntity {

    @EmbeddedId
    private PlaylistSongId playlistSongId;

    @ManyToOne
    @MapsId("playlistId")
    @JoinColumn (name = "id_playlist")
    private PlaylistEntity playlist;

    @ManyToOne
    @MapsId("songId")
    @JoinColumn (name = "id_song")
    private SongEntity song;

}
