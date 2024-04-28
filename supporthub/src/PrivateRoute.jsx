import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



export default function PrivateRoutes() {
    // Check if user has JWT token
  const isAuthenticated = localStorage.getItem("token") ? true : false;
    return (
        <>
            {isAuthenticated ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

    }
