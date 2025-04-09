package com.playlist.playlist.demo.service.interfaces;

import com.playlist.playlist.demo.domain.dto.UserDto;

public interface ILogInService {

    String logIn(UserDto user);

    String createUser(UserDto user);

    String resetPassword(UserDto user);

}
