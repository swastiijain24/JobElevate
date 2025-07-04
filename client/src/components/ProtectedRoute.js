import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({children, role})=>{
    const {user} = useContext(AuthContext);

    if(!user){
        return <Navigate to ='/login'/>

    }
    if(role && user.role !==role){
        return <Navigate to = '/' />;
    }

return children;
};

export default ProtectedRoute;

// If you're not logged in → redirected to login
// If you're a jobseeker → redirected to home
// If you're a recruiter → allowed access ✅

