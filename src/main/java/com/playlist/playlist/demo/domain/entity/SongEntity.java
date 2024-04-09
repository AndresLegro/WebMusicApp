package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table (name = "song")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SongEntity {

    @Id
    @Column(name = "id_song")
    private String idSong;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "album")
    private String album;

    @Column(name = "duration")
    private String duration;

    @Column(name = "image", length = 512)
    private String image;

    @OneToMany(mappedBy = "song")
    private List<PlaylistSongEntity> playlistSongs;

}
