package com.playlist.playlist.demo.repository;

import com.playlist.playlist.demo.domain.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SongRepository extends JpaRepository<SongEntity, String> {

    Optional<SongEntity> findById(String idSong);
    Optional<SongEntity> findByName(String name);
}
