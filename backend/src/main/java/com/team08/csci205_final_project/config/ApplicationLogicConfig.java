/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 16/11/2023
 * Time: 15:26
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.config
 * Class: ApplicationLogicConfig
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.config;

public class ApplicationLogicConfig {
    private double waitTimeForResponse = 60;

    private double radiusInKm = 30;

    public ApplicationLogicConfig(double WAIT_TIME, double radiusInKm) {
        this.waitTimeForResponse = WAIT_TIME;
        this.radiusInKm = radiusInKm;
    }

    public double getWaitTime() {
        return waitTimeForResponse;
    }

    public void setWaitTime(double WAIT_TIME) {
        this.waitTimeForResponse = WAIT_TIME;
    }

    public double getRadiusInKm() {
        return radiusInKm;
    }

    public void setRadiusInKm(double radiusInKm) {
        this.radiusInKm = radiusInKm;
    }
}