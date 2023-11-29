package com.team08.csci205_final_project.model.DTO;

import com.team08.csci205_final_project.model.Job.Job;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderRegister {

    /** Store the provider's current location */
    @NotBlank
    private GeoJsonPoint currentLocation;

    /** Vehicle details **/
    @NotBlank
    private String vehicleDetails;

    /** National identification number of the user. */
    @NotBlank
    private String nationalIdNumber;

    /** Driver's license number of the user. */
    @NotBlank
    private String driverLicense;

}
