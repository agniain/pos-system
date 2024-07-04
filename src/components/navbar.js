import React from 'react';
import HiveIcon from '@mui/icons-material/Hive';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../config';

const Navbar = () => {
  const { authToken, handleAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleAuthToken(null);
    navigate("/");
  };

  const username = localStorage.getItem('username');

  return (
    <nav className="bg-lime-600 flex justify-between items-center px-4 py-3 md:px-10 w-full">
      <div className="text-lime-100 font-semibold flex items-center space-x-4">
        <Link className="hover:bg-lime-500" to="/">
          <HiveIcon /> Midori
        </Link>
        <Link className="hover:bg-lime-500" to="/">
          Home
        </Link>
      </div>
      <div className="text-lime-100 flex space-x-4">
        {authToken ? (
          <>
            <span className="hover:bg-lime-500">{username}</span>
            <button onClick={handleLogout} className="hover:bg-lime-500">
              Logout
            </button>
          </>
        ) : (
          <div>
            <Link className="px-5 hover:bg-lime-500" to="/register">
              Sign up
            </Link>
            <Link className="hover:bg-lime-500" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;