import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";

const ProtectedRoute = ({user, redirectPath = '/login', children,}) => {
    let navigate = useNavigate();
    if (!user)
        navigate(redirectPath)
    return children ? children : <Outlet/>;
};

export default ProtectedRoute;