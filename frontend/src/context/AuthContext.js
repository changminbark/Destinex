import React, { createContext, useState } from 'react';
import * as authService from '../networks/api/authService';
import * as authUtils from '../networks/utils/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        setError(null);
        try {
            const response = await authService.login({ username, password });
            if (response.data && response.data.jwt) {
                authUtils.setToken(response.data.jwt);
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

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, error }}>
            {children}
        </AuthContext.Provider>
    );
};
