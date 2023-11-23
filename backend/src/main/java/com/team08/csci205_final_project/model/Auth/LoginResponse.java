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
 * Class: LoginResponse
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.model.Auth;

public class LoginResponse {
    private String jwt;

    public LoginResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
