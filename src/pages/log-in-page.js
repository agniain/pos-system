import React, { useState } from 'react';
import Navbar from '../components/navbar';
import LogIn from '../components/log-in';

const LogInPage = () => { 
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    setAuthToken(token);
  };

  return (
    <>
      <Navbar authToken={authToken} setAuthToken={handleAuthToken} />
      <LogIn setAuthToken={handleAuthToken} />
    </>
  );
};

export default LogInPage;