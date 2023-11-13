package com.team08.csci205_final_project.repository;

import com.team08.csci205_final_project.model.Provider;
import com.team08.csci205_final_project.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ProviderRepository extends MongoRepository<Provider, String> {

}
