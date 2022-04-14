import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";

const ProtectedRoute = ({isAllowed, redirectPath = '/login', children,}) => {
    let navigate = useNavigate();
    if (!isAllowed)
        navigate(redirectPath)
    return children ? children : <Outlet/>;
};

export default ProtectedRoute;