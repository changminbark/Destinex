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

import com.team08.csci205_final_project.model.Auth.Role;
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.model.Provider.Provider;
import com.team08.csci205_final_project.model.User.User;
import com.team08.csci205_final_project.repository.ProviderRepository;
import com.team08.csci205_final_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    public ProviderRepository providerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public JobService jobService;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public UserService userService;

    /** Add a new provider */
    public Optional<Provider> providerRegister () throws AccessDeniedException {
        String id = userService.getCurrentUserId();
        if (!userRepository.existsById(id)) {
            return Optional.empty();
        }
        User user = userRepository.findById(id).get();
        if (user.getRole() != Role.ROLE_USER.getValue()) {
            return Optional.empty();
        }
        Provider provider = new Provider();
        provider.setProviderAvail(true);
        provider.setActiveJob(null);
        provider.setUserId(user.getId());
        provider.setEmail(user.getEmail());
        provider.setCurrentLocation(user.getLocation());
        user.setRole(Role.ROLE_PROVIDER.getValue());
        return Optional.of(providerRepository.save(provider));
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

    /** Update the status after accepting job
     * @param id id of the provider
     * @return true/false if accepting the job is successful or not
     */
    public boolean acceptJob(String id) {
        Optional <Provider> provider = providerRepository.findById(id);
        if (provider.isPresent()) {
            Provider updatedProvider = provider.get();
            Job updateJob = updatedProvider.getActiveJob();
            if (updateJob != null) {
                jobService.acceptJob(updateJob.getId(), provider.get().getUserId());
                updatedProvider.setActiveJob(null);
                updatedProvider.setProviderAvail(false);
                providerRepository.save(updatedProvider);
                return true;
            }
            return false;
        }
        return false;
    }
}
