package com.team08.csci205_final_project.repository;

import com.team08.csci205_final_project.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface JobRepository extends MongoRepository<Job, String> {
    @Query("{'userId: ?1'}")
    public List<Job> findByUserId();
}
