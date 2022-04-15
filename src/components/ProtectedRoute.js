import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";

const ProtectedRoute = ({children, redirectPath = '/login'}) => {
    const isAuthenticated = localStorage.getItem(ACCESS_TOKEN);
    if(isAuthenticated)
        return children ? children : <Outlet />;
    else return <Navigate to={redirectPath} replace />;

};

export default ProtectedRoute;