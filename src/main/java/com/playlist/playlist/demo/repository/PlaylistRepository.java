package com.playlist.playlist.demo.repository;

import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import com.playlist.playlist.demo.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<PlaylistEntity, Integer> {

    //Optional<PlaylistEntity> findByIdAndIsDeletedFalse(int idPlaylist);
    //List<PlaylistEntity> findAllByAndIsDeletedFalse();
    Optional<PlaylistEntity> findByIdAndIdUserAndIsDeletedFalse(int idPlaylist, int idUser);
    List<PlaylistEntity> findAllByIdAndIdUserAndIsDeletedFalse(int idPlaylist, int idUser);
    List<PlaylistEntity> findAllByIdUserAndIsDeletedFalse(int idUser);
}
