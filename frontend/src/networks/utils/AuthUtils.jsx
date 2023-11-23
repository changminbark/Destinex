export const setToken = (token, username) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const clearToken = () => {
    return localStorage.clear();
}

export const checkInitialLoginState = () => {
    const token = getToken();
    return token !== null;
}
