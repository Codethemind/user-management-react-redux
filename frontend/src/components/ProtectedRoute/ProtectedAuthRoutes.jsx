import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedAuthRoutes = ({element}) => {
    const token = sessionStorage.getItem('token');

    if(token) {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.role;
        console.log('user role inside the auth protected route', userRole)
        if(userRole === 'admin') {
            return <Navigate to={"/admin/dashboard"}/>
        }
        if(userRole === 'normal') {
            return <Navigate to={"/"}/>
        }
    }
    return element;
}

export default ProtectedAuthRoutes;