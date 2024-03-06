package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Entity
@Table (name = "song")
@Getter
@Setter
public class SongEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSong")
    private Integer idSong;

    @Column(name = "name", nullable = false ,length = 64)
    private String name;

    @Column(name = "author", nullable = false ,length = 64)
    private String author;

    @Column(name = "album",length = 45)
    private String album;

    @Column(name = "url", nullable = false ,length = 512)
    private String url;

    @Column(name = "duration")
    private Time duration;

    @Column(name = "image", length = 512)
    private String image;


}
