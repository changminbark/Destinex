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
 * Package: com.team08.csci205_final_project.service
 * Class: UserService
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.service;

import com.team08.csci205_final_project.model.User.User;
import com.team08.csci205_final_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    /** A BcryptPassword Encoder object to encode the password */
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserRepository userRepository;

    /** Add a new user to the database */
    public User userRegister(User user) {
        // Automatically set the register date
        user.setRegisterDate(LocalDate.now());

        // Encode the user password to store in the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    /** Find a user based on userId */
    public Optional<User> findUserById(String userId) {
        return userRepository.findById(userId);
    }

    /** Find a user based on their email */
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /** Return all users in the database */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    /** Update a user's information */
    public User updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            return userRepository.save(user);
        }
        else {
            throw new RuntimeException("User not found with ID: " + user.getId());
        }
    }

    /** Delete a user based on their userId */
    public void deleteUser(String userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        }
        else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    /** Find a user's full name based on their username */
    public String getFullNameByUsername(String username) {
        Optional<User> userOpt = userRepository.findByEmail(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getFirstName() + " " + user.getLastName();
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }
}
