package com.playlist.playlist.demo.repository;

import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<PlaylistEntity, Integer> {

    Optional<PlaylistEntity> findByIdAndIsDeletedFalse(int idPlaylist);
}
