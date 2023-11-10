import { useState } from "react";
import * as authService from '../api/authService';
import * as authUtils from '../utils/authUtils';

export const useAuth = () => {
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await authService.login({username, password});

            if (response.data && response.data.token) {
                authUtils.setToken(response.data.token); // Store the JWT token in local storage
            } else {
                setError("Login failed: Token not found in the response");
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    return {login, error};
};
