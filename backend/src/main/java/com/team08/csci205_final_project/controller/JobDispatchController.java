/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 13/11/2023
 * Time: 14:53
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.controller
 * Class: JobDispatchController
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.controller;

import com.team08.csci205_final_project.model.DTO.JobOffer;
import com.team08.csci205_final_project.model.DTO.JobRequest;
import com.team08.csci205_final_project.model.DTO.JobResponse;
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.service.JobDispatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class JobDispatchController {

    @Autowired
    private JobDispatchService jobDispatchService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /** Endpoint to dispatch jobs to the providers */
    @MessageMapping("/dispatchJobs")
    public void dispatchJob(JobRequest jobRequest) {
        // Hard-coded radius for simplicity
        double radiusInKm = 30;
        jobDispatchService.dispatchJob(jobRequest.getJobId(), radiusInKm);
    }

    /** Endpoint for provider to response to job offer */
    @MessageMapping("/respondToJob")
    public void respondToJob(JobResponse jobResponse) {
        jobDispatchService.handleProviderResponse(jobResponse.getJobId(), jobResponse.getProviderId(), jobResponse.getStatus());
    }

    /** Method to send a job offer to a specific provider */
    public void sendJobOfferToProvider(String providerEmail, JobOffer jobOffer) {
        messagingTemplate.convertAndSendToUser(providerEmail, "/queue/job-offers", jobOffer);
    }
}
