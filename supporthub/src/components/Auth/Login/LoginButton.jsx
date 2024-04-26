// LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect user to login page
    navigate('/login');
  };

  return (
    <Button variant="gradient" fullWidth onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
