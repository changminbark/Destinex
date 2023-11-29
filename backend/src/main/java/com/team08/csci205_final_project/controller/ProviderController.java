/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 12/11/2023
 * Time: 00:23
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.controller
 * Class: ProviderController
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.controller;

import com.team08.csci205_final_project.model.Provider.Provider;
import com.team08.csci205_final_project.service.ProviderService;
import com.team08.csci205_final_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.AccessDeniedException;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    /** Create a new provider */
    @PostMapping("/register")
    public ResponseEntity<?> addProvider() throws AccessDeniedException {
        Optional <Provider> postProvider = providerService.providerRegister();
        if (postProvider.isPresent()) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(postProvider.get().getProviderId())
                    .toUri();
            return ResponseEntity.created(location).body(postProvider.get());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The account doesn't exist or already provider account");
    }

    /** Get provider information based on userId */
    @GetMapping("/{id}")
    public ResponseEntity<Provider> getProviderById(@PathVariable String id) {
        Optional<Provider> provider = providerService.findProviderById(id);
        return provider.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /** Update provider's information */
    @PutMapping("/{id}")
    public ResponseEntity<Provider> updateProvider(@PathVariable String id, @RequestBody Provider provider) throws AccessDeniedException {
        return providerService.findProviderById(id)
                .map(existingProvider -> {
                    existingProvider.setJobHistory(provider.getJobHistory());
                    existingProvider.setCurrentLocation(provider.getCurrentLocation());

                    //TODO
                    Provider updatedProvider = providerService.providerRegister().get();
                    return new ResponseEntity<>(updatedProvider, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /** Delete a provider */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProvider(@PathVariable String id) {
        providerService.deleteProvider(id);
        return ResponseEntity.noContent().build();
    }

    /** Update provider's location */
    @PatchMapping("/{id}/location")
    public ResponseEntity<HttpStatus> updateLocation(@PathVariable String id, @RequestBody Point location) {
        providerService.updateProviderLocation(id, location.getX(), location.getY());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /** Find nearby providers */
    @GetMapping("/nearby")
    public ResponseEntity<List<Provider>> findNearbyProviders(@RequestParam double latitude,
                                                              @RequestParam double longitude,
                                                              @RequestParam double distance) {
        List<Provider> providers = providerService.findNearbyProviders(latitude, longitude, distance);
        return new ResponseEntity<>(providers, HttpStatus.OK);
    }

    /** Accept a job for the provider */
    @PostMapping("/{id}/accept")
    public ResponseEntity<HttpStatus> acceptJob(@PathVariable String id) {
        if (providerService.acceptJob(id))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().build();
    }
}
