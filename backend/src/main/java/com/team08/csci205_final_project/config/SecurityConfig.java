/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 02/11/2023
 * Time: 15:13
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.config
 * Class: SecurityConfig
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

import com.team08.csci205_final_project.security.JwtAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/api/auth/login",
                                "/api/users/register").permitAll()
                        .requestMatchers("/api/users").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/transactions/delete/").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/transactions/add").hasAnyAuthority("ROLE_PROVIDER", "ROLE_ADMIN")
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    /** Method to encrypt the password using BCrypt dependency */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /** CORS configuration using WebMvcConfigurer */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * Configure "global" cross-origin request processing. The configured CORS
             * mappings apply to annotated controllers, functional endpoints, and static
             * resources.
             * <p>Annotated controllers can further declare more fine-grained config via
             * {@link CrossOrigin @CrossOrigin}.
             * In such cases "global" CORS configuration declared here is
             * {@link CorsConfiguration#combine(CorsConfiguration) combined}
             * with local CORS configuration defined on a controller method.
             *
             * @param registry
             * @see CorsRegistry
             * @see CorsConfiguration#combine(CorsConfiguration)
             * @since 4.2
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // React app's URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
