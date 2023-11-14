package com.team08.csci205_final_project.repository;

import com.team08.csci205_final_project.model.Provider.Provider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProviderRepository extends MongoRepository<Provider, String> {

}
