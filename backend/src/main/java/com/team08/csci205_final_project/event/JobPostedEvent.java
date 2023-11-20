/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 16/11/2023
 * Time: 14:51
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.event
 * Class: JobPostedEvent
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.event;

import com.team08.csci205_final_project.model.Job.Job;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;

public class JobPostedEvent extends ApplicationEvent {
    private final Job job;

    public JobPostedEvent(Object source, Job job) {
        super(source);
        this.job = job;
    }

    public Job getJob() {
        return job;
    }
}
