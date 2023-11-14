/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 13/11/2023
 * Time: 14:33
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.service
 * Class: DispatchService
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.service;

import com.team08.csci205_final_project.model.DTO.JobOffer;
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.model.Job.JobStatus;
import com.team08.csci205_final_project.model.Provider.Provider;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JobDispatchService {

    @Autowired
    private JobService jobService;

    @Autowired
    private ProviderService providerService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private TaskScheduler taskScheduler;

    private Map<String, String> jobProviderMap = new ConcurrentHashMap<>();

    /** Wait time before sending job offer to the next provider, in second */
    private double WAIT_TIME = 60;

    /** Dispatch a job to the nearest provider */
    public void dispatchJob(String jobId, double radiusInKm) {
        Optional<Job> jobOpt = jobService.findJobById(jobId);
        if(jobOpt.isEmpty()) {
            return;
        }

        Job job = jobOpt.get();
        List<Provider> nearbyProviders = providerService.findNearbyProviders(
                job.getReceiverAddressPoint().getX(),
                job.getReceiverAddressPoint().getY(),
                radiusInKm
        );

        for (Provider provider : nearbyProviders) {
            if (provider.getActiveJob() == null) {
                sendJobOffer(provider, job);
                // Schedule to check the response after a fixed delay
                taskScheduler.schedule(
                        () -> checkJobAcceptance(jobId, provider.getUserId(), radiusInKm),
                        new Date(System.currentTimeMillis() + (long)(WAIT_TIME * 1000))
                );
                // Store the mapping of job to provider
                jobProviderMap.put(jobId, provider.getUserId());
                // Break after sending the job offer
                break;
            }
        }

    }

    private void checkJobAcceptance(String jobId, String providerId, double radiusInKm) {
        Optional<Job> jobOpt = jobService.findJobById(jobId);
        if (!jobOpt.isPresent()) {
            jobProviderMap.remove(jobId);
            return;
        }

        Job job = jobOpt.get();
        if (job.getStatus() != JobStatus.ACCEPTED || !job.getProviderId().equals(providerId)) {
            // Remove if job not accepted
            jobProviderMap.remove(jobId);
            dispatchJob(jobId, radiusInKm);
        }
    }

    private void sendJobOffer(Provider provider, Job job) {
        JobOffer jobOffer = new JobOffer(job.getId(), job.getDescription(), job.getItemPrice());
        messagingTemplate.convertAndSendToUser(provider.getUserId(), "/queue/job-offers", jobOffer);
    }

    private void notifyUser(String userId, String message) {
        messagingTemplate.convertAndSendToUser(userId, "/user/job-status", message);
    }

    // Handle provider responses to job offers
    public void handleProviderResponse(String jobId, String providerId, JobStatus status) {
        Optional<Job> jobOpt = jobService.findJobById(jobId);
        if (!jobOpt.isPresent()) {
            // Handle the case where the job doesn't exist
            return;
        }

        Job job = jobOpt.get();

        if (status == JobStatus.ACCEPTED) {
            job.setProviderId(providerId);
            job.setStatus(JobStatus.ACCEPTED);
            jobService.updateJob(job);
            notifyUser(job.getUserId(), "Your job has been accepted by a provider.");
        } else if (status == JobStatus.REJECTED) {
            jobProviderMap.remove(jobId);
        }
    }
}
