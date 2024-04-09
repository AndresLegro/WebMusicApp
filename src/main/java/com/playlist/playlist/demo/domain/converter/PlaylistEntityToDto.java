package com.playlist.playlist.demo.domain.converter;

import com.playlist.playlist.demo.domain.dto.PlaylistDto;
import com.playlist.playlist.demo.domain.entity.PlaylistEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PlaylistEntityToDto implements Converter<PlaylistEntity, PlaylistDto> {

    @Override
    public PlaylistDto convert(PlaylistEntity playlist) {

        return PlaylistDto.builder()
                .name(playlist.getName())
                .author(playlist.getAuthor())
                .description(playlist.getDescription())
                .songsAmount(playlist.getSongsAmount())
                .image(playlist.getImage())
                .build();
    }
}
