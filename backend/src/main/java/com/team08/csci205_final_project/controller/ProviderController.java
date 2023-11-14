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

import com.team08.csci205_final_project.model.Provider;
import com.team08.csci205_final_project.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    /** Create a new provider */
    @PostMapping("/")
    public ResponseEntity<Provider> addProvider(@RequestBody Provider provider) {
        return ResponseEntity.ok(providerService.providerRegister(provider));
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
    public ResponseEntity<Provider> updateProvider(@PathVariable String id, @RequestBody Provider provider) {
        return providerService.findProviderById(id)
                .map(existingProvider -> {
                    existingProvider.setJobHistory(provider.getJobHistory());
                    existingProvider.setCurrentLocation(provider.getCurrentLocation());

                    Provider updatedProvider = providerService.providerRegister(existingProvider);
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
}
