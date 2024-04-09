package com.playlist.playlist.demo.repository;

import com.playlist.playlist.demo.domain.entity.PlaylistSongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSongEntity, Integer> {

    Optional<List<PlaylistSongEntity>> findByPlaylistId(int idPlaylist);
}
