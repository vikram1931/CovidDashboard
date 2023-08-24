package com.assignment.coviddashboardapplication.cofig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RestTemplateConfig implements WebMvcConfigurer{
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // all endpoints in the API
                .allowedOrigins("http://localhost:3000") // allowed origins
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // allowed request methods
    }
}
