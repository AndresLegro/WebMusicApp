package com.playlist.playlist.demo.repository;

import com.playlist.playlist.demo.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByUsernameAndPassword (String username, String password);

    Optional<UserEntity> findByUsername (String username);

    UserEntity findByIdUser(int idUser);
}
