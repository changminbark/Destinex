import React, { createContext, useState } from 'react';
import * as authService from '../networks/api/AuthService';
import * as authUtils from '../networks/utils/AuthUtils';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(authUtils.checkInitialLoginState());
    const navigate = useNavigate();

    const login = async (username, password) => {
        setError(null);
        try {
            const response = await authService.login({ username, password });
            if (response.data && response.data.jwt) {
                let dataObject = JSON.parse(response.config.data);
                let username = dataObject.username;
                authUtils.setToken(response.data.jwt, username);
                setIsLoggedIn(true);
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
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
