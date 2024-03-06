package com.playlist.playlist.demo.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "playlist")
@Getter
@Setter
public class PlaylistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "author", nullable = false, length = 45)
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "songsAmount", nullable = false)
    private int songsAmount;

    @Column(name = "image", length = 512)
    private String image;


}
