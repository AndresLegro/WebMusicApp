package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.domain.converter.PlaylistEntityToDto;
import com.playlist.playlist.demo.domain.converter.SongConverter;
import com.playlist.playlist.demo.domain.dto.PlaylistDto;
import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import com.playlist.playlist.demo.domain.entity.PlaylistSongEntity;
import com.playlist.playlist.demo.domain.entity.PlaylistSongId;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import com.playlist.playlist.demo.repository.PlaylistRepository;
import com.playlist.playlist.demo.repository.PlaylistSongRepository;
import com.playlist.playlist.demo.repository.SongRepository;
import com.playlist.playlist.demo.service.interfaces.IPlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PlaylistServiceImpl implements IPlaylistService {

    PlaylistEntityToDto playlistEntityToDto;
    SongConverter songConverter;
    PlaylistRepository playlistRepository;
    SongRepository songRepository;
    SpotifySongsService songsService;
    PlaylistSongRepository playlistSongRepository;

    private ArrayList<SongEntity> playlist = new ArrayList<SongEntity>();

    @Override
    public Optional<PlaylistDto> getPlaylist(int idPlaylist) {

        Optional<PlaylistEntity> playlistToFind = playlistRepository.findByIdAndIsDeletedFalse(idPlaylist);
        if (playlistToFind.isPresent()){

            PlaylistEntity playlist = playlistToFind.get();
            PlaylistDto playlistDto = playlistEntityToDto.convert(playlist);

            List<PlaylistSongEntity> playlistSongs= playlistSongRepository.findByPlaylistId(playlist.getId()).get();

            List<SongDto> songDtos = playlistSongs.stream().map
                    (playlistSong -> songConverter.convertToDto(playlistSong.getSong()))
                    .collect(Collectors.toList());

            playlistDto.setSongs(songDtos);

            return Optional.ofNullable(playlistDto);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Error al obtener la playlist!: La playlist no existe ");
        }
    }

    @Override
    public List<SongEntity> createPlaylist(PlaylistEntity playlistToCreate) {

        List<PlaylistEntity> playlistDataBase = playlistRepository.findAll();

        boolean nameExists = playlistDataBase.stream().anyMatch(playlistName ->
                playlistName.getName().equalsIgnoreCase(playlistToCreate.getName()));

        if(nameExists){
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("La playlist con nombre %S ya existe!", playlistToCreate.getName()));
        }

        PlaylistEntity playlistEntity = PlaylistEntity.builder()
                .name(playlistToCreate.getName())
                .author(playlistToCreate.getAuthor())
                .description(playlistToCreate.getDescription())
                .songsAmount(0)
                .image(playlistToCreate.getImage())
                .build();

        playlistRepository.save(playlistEntity);
        return playlist;
    }

    @Override
    public PlaylistDto updatePlayList(PlaylistEntity playlistChanged, int idPlaylist) {

        Optional<PlaylistEntity> playlistToFind = playlistRepository.findByIdAndIsDeletedFalse(idPlaylist);

        if( playlistToFind.isPresent()){
            PlaylistEntity playlistEntity = playlistToFind.get();
            boolean isChanged = false;

            if (playlistChanged.getName() != null && !playlistChanged.getName().equalsIgnoreCase(playlistEntity.getName())) {
                playlistEntity.setName(playlistChanged.getName());
                isChanged = true;
            }

            if (playlistChanged.getDescription() != null && !playlistChanged.getDescription().equalsIgnoreCase(playlistEntity.getDescription())) {
                playlistEntity.setDescription(playlistChanged.getDescription());
                isChanged = true;
            }

            if (playlistChanged.getImage() != null && !playlistChanged.getImage().equalsIgnoreCase(playlistEntity.getImage())) {
                playlistEntity.setImage(playlistChanged.getImage());
                isChanged = true;
            }

            if (!isChanged) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Error al actualizar la playlist, hay campos que son iguales a los que se desean cambiar!");
            }

            return playlistEntityToDto.convert(playlistRepository.save(playlistEntity));
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Error al guardar la canción a la playlist!: la canción o la playlist no existen ");
        }
    }

    @Override
    public void deletePlaylist(int idPlaylist) {
        Optional<PlaylistEntity> playlistToFind = playlistRepository.findByIdAndIsDeletedFalse(idPlaylist);

        if (playlistToFind.isPresent()){
            PlaylistEntity playlistEntity = playlistToFind.get();
            playlistEntity.setDeleted(true); // Marcar la playlist como eliminada
            playlistRepository.save(playlistEntity);
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe o ya ha sido eliminada");
        }
    }

        @Override
        public void addSongToPlaylist(String idSong, int idPlaylist) {

            Optional<PlaylistEntity> playlistToFind = playlistRepository.findByIdAndIsDeletedFalse(idPlaylist);
            Optional<SongEntity> songToFind = songRepository.findById(idSong);

            if(playlistToFind.isPresent() && songToFind.isPresent() ){

                PlaylistEntity playlistEntity = playlistToFind.get();
                SongEntity songEntity = songToFind.get();

                PlaylistSongId playlistSongId =  new PlaylistSongId();
                playlistSongId.setPlaylistId(idPlaylist);
                playlistSongId.setSongId(idSong);

                PlaylistSongEntity playlistSong= new PlaylistSongEntity();
                playlistSong.setPlaylistSongId(playlistSongId);
                playlistSong.setPlaylist(playlistEntity);
                playlistSong.setSong(songEntity);

                playlistSongRepository.save(playlistSong);

                int newSongsAmount = playlistEntity.getSongsAmount() + 1;
                playlistEntity.setSongsAmount(newSongsAmount);

                playlistRepository.save(playlistEntity);
            }else {
                throw new RuntimeException("Error al guardar la canción a la playlist!: la canción o la playlist no existen ");
            }
    }
}
