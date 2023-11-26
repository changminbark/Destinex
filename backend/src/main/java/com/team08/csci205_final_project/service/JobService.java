/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Pham
 * Section: 10AM
 * Date: 11/6/2023
 * Time: 10:50 AM
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.service
 * Class: JobService
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.service;

import com.team08.csci205_final_project.event.JobPostedEvent;
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.model.Job.JobStatus;
import com.team08.csci205_final_project.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    /** Auto trigger a job dispatch event after posting a new job */
    @Autowired
    ApplicationEventPublisher eventPublisher;

    /**
     * Create a job in the database and return
     * @param job the information of the job including
     *            "userId", "category", "description", "receiverName".
     *            "receiverAddress", "receiverPhone"
     * @return the job after created with added information
     */
    public Job createJob(Job job) {
        job.setCreatedDate(LocalDate.now());
        Job savedJob = jobRepository.save(job);

        // Publish an event after the job is saved
        eventPublisher.publishEvent(new JobPostedEvent(this, savedJob));

        return job;
    }

    /**
     * Find the job by id of the job
     * @param id id of the job
     * @return the job
     */
    public Optional<Job> findJobById(String id) {
        return jobRepository.findById(id);
    }

    /**
     * Find the job by user ID
     * @param id ID of the job
     * @return list of job from an user id
     */
    public List<Job> findJobByUser(String id, JobStatus jobStatus) {
        return jobRepository.findByUserId(id, jobStatus);
    }

    /**
     * Update the job by id
     * @param job job after updated
     * @return Job after updated
     */
    public Job updateJob(Job job) {
        if (jobRepository.existsById(job.getId())) {
            return jobRepository.save(job);
        }
        else {
            // This will never happen
            throw new RuntimeException("Job not found with ID: " + job.getId());
        }
    }

    /**
     * Delete the job from database
     * @param id the Job id
     * @return true or false if the deletion is successful
     */
    public boolean deleteJob(String id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Accept the job from provider
     * @param id id of the job
     * @param providerId id from provider
     * @return
     */
    public Job acceptJob(String id, String providerId) {
        Optional <Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            Job updatedJob = job.get();
            updatedJob.setStatus(JobStatus.ACCEPTED);
            updatedJob.setProviderId(providerId);
            jobRepository.save(updatedJob);
        }
        return null;
    }
}
