/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 11/11/2023
 * Time: 19:14
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.service
 * Class: ProviderService
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.service;

import com.team08.csci205_final_project.model.Provider;
import com.team08.csci205_final_project.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    public ProviderRepository providerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    /** Add a new provider */
    public Provider providerRegister (Provider provider) {
        return providerRepository.save(provider);
    }

    /** Find a provider based on their userId */
    public Optional<Provider> findProviderById (String id) {
        return providerRepository.findById(id);
    }

    /** Update a provider's location */
    public void updateProviderLocation(String providerId, double latitude, double longtitude) {
        Optional<Provider> providerOpt = providerRepository.findById(providerId);
        if (providerOpt.isPresent()) {
            Provider provider = providerOpt.get();
            provider.setCurrentLocation(new GeoJsonPoint(longtitude, latitude));
            providerRepository.save(provider);
        }
    }

    /** Find nearby providers in radius of distanceInKm km */
    public List<Provider> findNearbyProviders(double longitude, double latitude, double distanceInKm) {
        Point point = new Point(longitude, latitude);
        Distance distance = new Distance(distanceInKm, Metrics.KILOMETERS);

        Query query = new Query();
        query.addCriteria(Criteria.where("currentLocation").nearSphere(point).maxDistance(distance.getNormalizedValue()));

        return mongoTemplate.find(query, Provider.class, "providers");
    }

    /** Delete provider */
    public void deleteProvider(String userId) {
        if (providerRepository.existsById(userId)) {
            providerRepository.deleteById(userId);
        }
        else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }
}
