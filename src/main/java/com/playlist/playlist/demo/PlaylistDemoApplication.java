package com.playlist.playlist.demo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class PlaylistDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaylistDemoApplication.class, args);
	}

}
