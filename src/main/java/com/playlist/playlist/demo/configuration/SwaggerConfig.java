package com.playlist.playlist.demo.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@Configuration
@EnableWebMvc
public class SwaggerConfig {
    @Bean
    public OpenAPI getApiInfo() {

        Contact contact = new Contact();
        contact.setName("Andrés Legro");
        contact.setEmail("andreslegrog@gmail.com");

        return new OpenAPI().
                info(new Info()
                        .title("Playlist Project Demo")
                        .version("1.0")
                        .description("API which consumes de spotify API and allows to manage and create playlist")
                        .contact(contact)

                );

    }
}
