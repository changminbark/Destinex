package com.team08.csci205_final_project.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Format for exception response")
public class ExceptionResponse {
    @Schema(description = "Time on server")
    private Date timestamp;

    @Schema(description = "Error messages", example = "User has already logged in")
    private String message;

    @Schema(description = "Additional details or instructions to resolve problem", example = "Please log in again")
    private String details;
}
