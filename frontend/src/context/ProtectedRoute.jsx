import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ErrorPage from "../pages/common/error/ErrorPage";

const ProtectedRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <ErrorPage isLoggedIn={false}/>;
};

export default ProtectedRoute;
