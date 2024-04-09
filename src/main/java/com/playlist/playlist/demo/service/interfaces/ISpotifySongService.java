package com.playlist.playlist.demo.service.interfaces;

import com.playlist.playlist.demo.domain.entity.SongEntity;
import java.util.Optional;

public interface ISpotifySongService {

    Optional<SongEntity> getSong(String idSong);
    SongEntity saveSong(String songToSearch, int selectedSongIndex);
}
