/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 04/11/2023
 * Time: 00:46
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.model
 * Class: LoginRequest
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.model;

public class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
