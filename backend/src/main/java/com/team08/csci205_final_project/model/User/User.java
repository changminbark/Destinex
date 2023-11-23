package com.team08.csci205_final_project.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;

/**
 * Represents a User entity in the system.
 */
@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    /** Unique identifier for the user */
    @Id
    private String id;

    /** First name of the user */
    private String firstName;

    /** Last name of the user */
    private String lastName;

    /** Email address of the user */
    private String email;

    /** Password of the user */
    private String password;

    /** Date of birth of the user */
    private LocalDate dateOfBirth;

    /** Register date of the user */
    private LocalDate registerDate;

    /** Geospatial location of the user */
    private GeoJsonPoint location;

    /** Role of the user in the system */
    private int role;

    /** National identification number of the user. */
    private String nationalIdNumber;

    /** Picture or image of the user's national ID. */
    private String nationalIdPicture;

    /** Driver's license number of the user. */
    private String driverLicense;

    /** Rating or score associated with the user based on reviews or feedback. */
    private Double rating;

    /** Current job ID if the user is associated with a job or task. */
    private String currentJobId;
}
