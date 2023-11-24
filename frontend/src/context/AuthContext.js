import React, {createContext, useEffect, useState} from 'react';
import * as authService from '../networks/api/AuthService';
import * as authUtils from '../networks/utils/AuthUtils';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(authUtils.checkInitialLoginState());
    const [userEmail, setUserEmail] = useState(authUtils.getUsername());
    const [userFullName, setUserFullName] = useState(authUtils.getFullName());
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize user data from localStorage
        setUserEmail(authUtils.getUsername());
        setUserFullName(authUtils.getFullName());
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const response = await authService.login({ username, password });
            if (response.data && response.data.jwt) {
                setIsLoggedIn(true);
                setUserEmail(username);
                setUserFullName(response.data.fullName);

                console.log("hehehehehe", response.data.fullName);
                console.log("hehehehehe", username);

                authUtils.setToken(response.data.jwt);
                authUtils.setUsername(username);
                authUtils.setFullName(response.data.fullName)
                return true;
            } else {
                setError('Login failed: Token not found');
                return false;
            }
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const logout = () => {
        authUtils.clearToken();
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserFullName(null);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, userFullName, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
