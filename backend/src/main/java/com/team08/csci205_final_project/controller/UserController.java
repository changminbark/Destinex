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

import com.team08.csci205_final_project.exception.DuplicateAccountException;
import com.team08.csci205_final_project.model.User.User;
import com.team08.csci205_final_project.model.DTO.UserRegister;
import com.team08.csci205_final_project.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /** API endpoint to create a new user */
    @Operation(summary = "Register an user account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Register Successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))})
    })
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRegister userRegister) {
        if (userService.findUserByEmail(userRegister.getEmail()).isEmpty())
            return ResponseEntity.ok(userService.userRegister(userRegister));
        else {
            throw new DuplicateAccountException("You already signed up. Please log in");
        }
    }

    /** API endpoint to get all users' information */
    @Hidden
    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    /** API endpoint to get user's information based on userId */
    @Hidden
    @GetMapping
    public ResponseEntity<User> getCurrentUserInfo() {
            String id = userService.getCurrentUserId();
            User user = userService.findUserById(id);
            return ResponseEntity.ok(user);
    }

    /** API endpoint to get user's information based on email */
    @Hidden
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /** API endpoint to edit user's information */
    @Hidden
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        if (!id.equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.updateUser(user));
    }

    /** API endpoint to delete a user based on userId */
    @Hidden
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
