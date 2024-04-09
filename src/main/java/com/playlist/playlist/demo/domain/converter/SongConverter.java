package com.playlist.playlist.demo.domain.converter;
import com.playlist.playlist.demo.domain.dto.SongDto;
import com.playlist.playlist.demo.domain.entity.SongEntity;
import org.springframework.stereotype.Component;

@Component
public class SongConverter {

    public SongDto convertToDto(SongEntity song) {
        return SongDto.builder()
                .idSong(song.getIdSong())
                .name(song.getName())
                .author(song.getAuthor())
                .album(song.getAlbum())
                .duration(song.getDuration())
                .image(song.getImage())
                .build();
    }
    public SongEntity convertToEntity(SongDto songDto) {
        return SongEntity.builder()
                .idSong(songDto.getIdSong())
                .name(songDto.getName())
                .author(songDto.getAuthor())
                .album(songDto.getAlbum())
                .duration(songDto.getDuration())
                .image(songDto.getImage())
                .build();
    }

}
