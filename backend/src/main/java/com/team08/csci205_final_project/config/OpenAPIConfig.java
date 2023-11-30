package com.team08.csci205_final_project.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openApiInformation() {
        Server localServer = new Server()
                .url("http://localhost:8080")
                .description("Localhost Server URL");

        Contact contact = new Contact()
                .email("hqp001@bucknell.edu")
                .name("Hung Pham");

        Info info = new Info()
                .contact(contact)
                .description("The documentation has the same version as the back-end code you run." +
                        "\nThe documentation does not contain WebSocket endpoints")
                .summary("Demo of Spring Boot 3 & Open API 3 Integration")
                .title("API Documentation and User Instructions")
                .version("V1.0.0")
                .license(new License().name("Apache 2.0").url("http://springdoc.org"));

        return new OpenAPI().info(info).addServersItem(localServer);
    }

    private OpenApiCustomizer securityOpenApiCustomiser() {
        return openApi -> openApi.components(new io.swagger.v3.oas.models.Components()
                .addSecuritySchemes("bearerAuth", new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT") // Optional: Use if you want to specify JWT
                ));
    }

//
//    @Bean
//    public GroupedOpenApi userApi() {
//        return GroupedOpenApi.builder()
//                .group("public-api")
//                .addOpenApiCustomizer(securityOpenApiCustomiser())
//                .packagesToScan("com.team08.csci205_final_project")
//                .build();
//    }
//
//    @Bean
//    public GroupedOpenApi devApi() {
//        return GroupedOpenApi.builder()
//                .group("dev")
//                .build();
//    }
}
