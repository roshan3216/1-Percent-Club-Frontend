import React from 'react'
import { Navigate } from 'react-router-dom';


const RequireAuth= ({children}) => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken){
        console.log('No access token in localStorage');
        return <Navigate to = '/login' />;
    }

    return <>{children}</>;
}

export default RequireAuth;