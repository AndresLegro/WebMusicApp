package com.playlist.playlist.demo.domain.converter;

import com.playlist.playlist.demo.domain.dto.UserDto;
import com.playlist.playlist.demo.domain.entity.UserEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserEntityToDto implements Converter<UserEntity, UserDto> {
    @Override
    public UserDto convert(UserEntity userEntity) {
        return UserDto.builder()
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .build();
    }
}
