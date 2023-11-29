package com.team08.csci205_final_project.model.DTO;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

public class NewJobRequest {

    /** The category of the job. */
    @NotBlank
    private String category;

    /** A description of the job. */
    @NotBlank
    private String description;

    /** The name of the receiver of the job's output. */
    @NotBlank
    private String receiverName;

    /** Convert the receiver address to longitude and latitude */
    @NotBlank
    private Double xCoordinate;

    @NotBlank
    private Double yCoordinate;

    /** The phone number of the receiver of the job's output. */
    @NotBlank
    private String receiverPhone;

    /** The email of the receiver of the job's output. */
    @NotBlank
    private String receiverEmail;
}
