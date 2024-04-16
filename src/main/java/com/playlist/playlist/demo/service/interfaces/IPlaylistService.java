package com.playlist.playlist.demo.service.interfaces;

import com.playlist.playlist.demo.domain.converter.PlaylistEntityToDto;
import com.playlist.playlist.demo.domain.dto.PlaylistDto;
import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import com.playlist.playlist.demo.domain.entity.SongEntity;

import java.util.List;
import java.util.Optional;

public interface IPlaylistService {

    Optional<PlaylistDto> getPlaylist(int idPlaylist);
    Optional<List<PlaylistDto>> getAllPlaylist();
    List<SongEntity> createPlaylist(PlaylistEntity playlist);
    PlaylistDto updatePlayList(PlaylistEntity playlistChanged, int idPlaylist);
    void deletePlaylist(int idPlaylist);
    void addSongToPlaylist (String idSong, int idPlaylist);
}
