/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Ngo
 * Section: YOUR SECTION
 * Date: 04/11/2023
 * Time: 00:54
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.model
 * Class: CustomUserDetails
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Role role = Role.fromInt(user.getRole());
        GrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum Role {
        ROLE_USER(1), // User role represented by 1
        ROLE_PROVIDER(2), // Provider role by 2
        ROLE_ADMIN(3); // Admin role by 3

        private final int value;

        Role(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }

        public static Role fromInt(int role) {
            for (Role r : Role.values()) {
                if (r.getValue() == role) {
                    return r;
                }
            }
            throw new IllegalArgumentException("Unknown role integer: " + role);
        }
    }
}
