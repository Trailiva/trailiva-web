import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";

const ProtectedRoute = ({children, redirectPath = '/login'}) => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken)
        return children ? children : <Outlet />;
    else return <Navigate to={redirectPath}/>;

};

export default ProtectedRoute;