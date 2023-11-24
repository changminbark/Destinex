export const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const setUsername = (username) => {
    localStorage.setItem('username', username);
}

export const setFullName = (fullName) => {
    localStorage.setItem('userFullName', fullName);
}

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const getFullName = () => {
    return localStorage.getItem('userFullName');
}

export const clearToken = () => {
    return localStorage.clear();
}

export const checkInitialLoginState = () => {
    const token = getToken();
    return token !== null;
}
