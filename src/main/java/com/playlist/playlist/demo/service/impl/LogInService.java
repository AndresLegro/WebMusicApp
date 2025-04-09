package com.playlist.playlist.demo.service.impl;

import com.playlist.playlist.demo.domain.converter.UserEntityToDto;
import com.playlist.playlist.demo.domain.dto.UserDto;
import com.playlist.playlist.demo.domain.entity.UserEntity;
import com.playlist.playlist.demo.repository.UserRepository;
import com.playlist.playlist.demo.service.interfaces.ILogInService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class LogInService implements ILogInService {

    UserRepository userRepository;
    UserEntityToDto userConverter;
    SpotifyAuthServiceImpl spotifyAuthService;
    private int idUserLogged;

    public LogInService(UserRepository userRepository, UserEntityToDto userConverter, SpotifyAuthServiceImpl spotifyAuthService) {
        this.userRepository = userRepository;
        this.userConverter = userConverter;
        this.spotifyAuthService = spotifyAuthService;
    }

    @Override
    public String logIn(UserDto user) {

        Optional<UserEntity> userEntity = userRepository.findByUsernameAndPassword(user.getUsername(),user.getPassword());

        if (userEntity.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or password not found!");
        }

        saveUserInfo(userEntity.get().getIdUser());

        return String.format("Welcome %s" , user.getUsername());
    }

    @Override
    public String createUser(UserDto user) {

        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already in use");
        }

        UserEntity userEntity = UserEntity.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
        userConverter.convert(userRepository.save(userEntity));

        return "User created successfully!";
    }

    @Override
    public String resetPassword(UserDto user) {

        Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());

        if(userEntity.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username no exists");
        }

        UserEntity userFoundToChangePassword = userEntity.get();
        userFoundToChangePassword.setPassword(user.getPassword());

        userRepository.save(userFoundToChangePassword);
        return "Password Changed Successfully!";
    }

    private void saveUserInfo(int idUser){
        idUserLogged = idUser;
    }

    protected int getIdUserLogged(){
        return idUserLogged;
    }

}
