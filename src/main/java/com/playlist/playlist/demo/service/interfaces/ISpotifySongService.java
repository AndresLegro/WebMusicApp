package com.playlist.playlist.demo.service.interfaces;

import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.SongEntity;

import java.util.List;
import java.util.Optional;

public interface ISpotifySongService {

    List<SongDto> getSong(String idSong);
    SongEntity saveSong(String songToSearch);
}
