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

import com.team08.csci205_final_project.config.ApplicationLogicConfig;
import com.team08.csci205_final_project.event.JobPostedEvent;
import com.team08.csci205_final_project.model.DTO.JobOffer;
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.model.Job.JobStatus;
import com.team08.csci205_final_project.model.Provider.Provider;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JobDispatchService implements ApplicationListener<JobPostedEvent> {

    @Autowired
    private JobService jobService;

    @Autowired
    private ProviderService providerService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private TaskScheduler taskScheduler;

    /** Map to store a list of available providers */
    private Map<String, String> jobProviderMap = new ConcurrentHashMap<>();

    /** Map to store a pair of jobId - providers that reject that job */
    private Map<String, List<String>> jobRejectionsMap = new ConcurrentHashMap<>();

    /** Application configuration data */
    private ApplicationLogicConfig configData;

    @Override
    public void onApplicationEvent(JobPostedEvent event) {
        Job job = event.getJob();
        System.out.println("Received JobPostedEvent for job: " + job.getId());
        dispatchJob(job.getId(), 30);
    }

    /** Asynchronously dispatch a job to the nearest provider */
//    @Async("jobDispatchExecutor")
    public void dispatchJob(String jobId, double radiusInKm) {
        System.out.println("Starting dispatchJob for jobId: " + jobId);
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

        List<String> rejectedProviders = jobRejectionsMap.getOrDefault(jobId, new ArrayList<>());

        for (Provider provider : nearbyProviders) {
            System.out.println(nearbyProviders);
            if (provider.getActiveJob() == null && !rejectedProviders.contains(provider.getProviderId())) {
                String message = "Job " + job.getId() + " assigned to provider with mail: " + provider.getEmail();
                System.out.println(message);
                sendJobOffer(provider, job);
                // Schedule to check the response after a fixed delay
                taskScheduler.schedule(
                        () -> checkJobAcceptance(jobId, provider.getProviderId(), radiusInKm),
                        new Date(System.currentTimeMillis() + (long)(100 * 1000))
                );
                // Store the mapping of job to provider
                if (provider.getProviderId() != null) {
                    jobProviderMap.put(jobId, provider.getProviderId());
                }
                else {
                    System.out.println("Provider ID is null for provider: " + provider);
                }
                // Break after sending the job offer
                break;
            }
        }
        System.out.println("Finished dispatchJob for jobId: " + jobId);
    }

    private void checkJobAcceptance(String jobId, String providerId, double radiusInKm) {
        System.out.println("Checking job acceptance for jobId: " + jobId + ", providerId: " + providerId);
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
        System.out.println("Sending job offer for job: " + job.getId() + " to provider: " + provider.getEmail());
        messagingTemplate.convertAndSendToUser(provider.getEmail(), "/queue/job-offers", jobOffer);
    }

    private void notifyUser(String providerEmail, String message) {
        messagingTemplate.convertAndSendToUser(providerEmail, "/user/job-status", message);
    }

    // Handle provider responses to job offers
    public void handleProviderResponse(String jobId, String providerId, JobStatus status) {
        System.out.println("Handling provider response for job: " + jobId + ", provider: " + providerId + ", status: " + status);
        Optional<Job> jobOpt = jobService.findJobById(jobId);
        if (!jobOpt.isPresent()) {
            // Handle the case where the job doesn't exist
            return;
        }

        Job job = jobOpt.get();

        if (status == JobStatus.ACCEPTED) {
            System.out.println("================== Job " + jobId + " is accepted by provider " + providerId);
            job.setProviderId(providerId);
            job.setStatus(JobStatus.ACCEPTED);
            jobService.updateJob(job);
            notifyUser(job.getUserId(), "Your job has been accepted by a provider.");
        } else if (status == JobStatus.REJECTED) {
            System.out.println("xxxxxxxxxxxxxxxxxx Job " + jobId + " is rejected by provider " + providerId + ". Assigning to another providers");
            jobRejectionsMap.computeIfAbsent(jobId, k -> new ArrayList<>()).add(providerId);
            jobProviderMap.remove(jobId);
            dispatchJob(jobId, 30);
        } else {
            System.out.println("Providers didn't respond in the allowance time for job: " + jobId + ". Dispatching to new provider.");
            jobProviderMap.remove(jobId);
            dispatchJob(jobId, 30);
        }
    }
}
