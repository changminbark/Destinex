/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 02/11/2023
 * Time: 15:05
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.controller
 * Class: UserController
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.controller;

import com.team08.csci205_final_project.model.Job;
import com.team08.csci205_final_project.model.JobStatus;
import com.team08.csci205_final_project.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    /**
     * The interface for requesting a job
     * @param job the information of the job including
     *            "userId", "category", "description", "receiverName"
     *            "receiverAddress", "receiverPhone"
     * @return The response from the request
     */
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job savedJob = jobService.createJob(job);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedJob.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedJob);
    }

    /**
     * Get the job with its ID
     * @param id ID of the job
     * @return the job
     */
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        return jobService.findJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all the job from one user
     * @param id Id of the user
     * @param status job status
     * @return All the job of that user
     */
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Job>> getJobByUser(@PathVariable String id,
                                                  @RequestParam(required = false) JobStatus status) {
        return ResponseEntity.ok(jobService.findJobByUser(id, status));
    }

    /**
     * API endpoint to update the job or creating new one using PUT method
     * @param id id of the job to update or create
     * @param job the job content
     * @return response with code 201 or 200
     */
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job job) {
        job.setId(id);
        if (jobService.findJobById(id).isEmpty()) {
            return createJob(job);
        }
        else {
            Job updatedJob = jobService.updateJob(job);
            return ResponseEntity.ok(updatedJob);
        }
    }

    /**
     * Delete the job from database
     * @param id id of the job
     * @return response with no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (jobService.deleteJob(id)) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
