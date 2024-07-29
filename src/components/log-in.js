import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_USER } from '../graphql/queries';
import bcrypt from 'bcryptjs';

const LogIn = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loginUser, { data: loginData, error: loginError }] = useLazyQuery(GET_USER);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      loginUser({ variables: { username } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      if (loginData) {
        const user = loginData.users[0];
        if (user) {
          const validPassword = await bcrypt.compare(formData.password, user.password);
          if (validPassword) {
            const token = btoa(JSON.stringify({ username: formData.username }));
            setAuthToken(token);
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', formData.username);
            localStorage.setItem('role', user.role);
            
            // Redirect based on role
            switch (user.role) {
              case 'admin':
                navigate('/order');
                break;
              case 'inventory':
                navigate('/product');
                break;
              case 'cashier':
                navigate('/order');
                break;
              default:
                navigate('/');
                break;
            }
          } else {
            setErrorMessage('Invalid username or password');
          }
        } else {
          setErrorMessage('username or password is incorrect');
        }
      }
    };
    authenticateUser();
  }, [loginData, formData, setAuthToken, navigate]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-1/3 p-4 border'>
        <h1 className='text-xl mb-4 font-bold text-center'>Log in</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className="mb-4 flex items-center">
            <label htmlFor="username" className="w-1/3 mr-2 text-left">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded-md p-2 w-2/3"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="w-1/3 mr-2 text-left">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md p-2 w-2/3"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <button type="submit" className='bg-lime-600 px-6 py-2 text-white text-center hover:bg-lime-500'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;