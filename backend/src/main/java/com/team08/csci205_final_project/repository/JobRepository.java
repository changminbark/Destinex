package com.team08.csci205_final_project.repository;

import com.team08.csci205_final_project.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepository extends MongoRepository<Job, String> {
}
