package com.team08.csci205_final_project.model.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegister {
    /** First name of the user */
    @NotBlank
    private String firstName;

    /** Last name of the user */
    @NotBlank
    private String lastName;

    /** Email address of the user */
    @NotBlank
    private String email;

    /** Password of the user */
    @NotBlank
    private String password;
}
