package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "playlist")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_playlist")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "author", nullable = false, length = 45)
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "songs_amount", nullable = false)
    private int songsAmount;

    @Column(name = "image", length = 2048)
    private String image;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "playlist")
    private List<PlaylistSongEntity> playlistSongs;

    @Column(name = "id_user", nullable = false)
    private Integer idUser;

}
