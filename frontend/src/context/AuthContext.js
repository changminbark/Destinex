import React, { createContext, useState } from 'react';
import * as authService from '../networks/api/AuthService';
import * as authUtils from '../networks/utils/AuthUtils';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(authUtils.checkInitialLoginState());
    const [userEmail, setUserEmail] = useState(null);
    const [userFullName, setUserFullName] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        setError(null);
        try {
            const response = await authService.login({ username, password });
            if (response.data && response.data.jwt) {
                let dataObject = JSON.parse(response.config.data);
                authUtils.setToken(response.data.jwt);
                setIsLoggedIn(true);
                setUserEmail(username);
                setUserFullName(response.data.fullName);
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
