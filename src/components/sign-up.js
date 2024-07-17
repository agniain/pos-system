import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../graphql/mutations';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: '', username: '', email: '', password: '', role: 'cashier' });
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, username, email, password, role } = formData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await registerUser({ variables: { full_name, username, email, password: hashedPassword, role } });
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-1/3 p-4 border border-lime-900">
        {registrationSuccess ? (
          <div className="py-4 text-center">
            <div className="text-black text-2xl mb-4">
              Account Successfully Registered!
            </div>
            <div className="mt-4">
              <button onClick={handleLoginRedirect} className="bg-lime-700 px-6 py-2 text-white rounded hover:bg-lime-500">
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h1 className="text-xl mb-4 font-bold text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-4 flex items-center">
                <label htmlFor="full_name" className="w-1/3 mr-2 text-left">Full Name:</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-2/3"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="email" className="w-1/3 mr-2 text-left">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-2/3"
                  required
                />
              </div>
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
              <div className="mb-4 flex items-center">
                <label htmlFor="role" className="w-1/3 mr-2 text-left">Role:</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-2/3"
                  required
                >
                  <option value="cashier">Cashier</option>
                  <option value="inventory">Inventory</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="bg-lime-600 px-6 py-2 text-white text-center hover:bg-lime-500">
                Sign Up
              </button>
            </form>
            <p className="mt-5 mb-3 flex justify-center">Have an account?</p>
            <Link to='/login' className="flex justify-center text-black hover:bg-lime-200">
              Login
            </Link>           
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;