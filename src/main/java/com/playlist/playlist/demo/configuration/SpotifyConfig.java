package com.playlist.playlist.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Configuration
public class SpotifyConfig {

   @Bean
   public RestTemplate restTemplate() {
       RestTemplate restTemplate = new RestTemplate();

       List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
       messageConverters.add(new MappingJackson2HttpMessageConverter());
       messageConverters.add(new FormHttpMessageConverter());

       restTemplate.setMessageConverters(messageConverters);

       return restTemplate;
   }
}
