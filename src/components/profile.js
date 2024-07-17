import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { UPDATE_USER_PROFILE } from '../graphql/mutations';

const Profile = () => {
  const username = localStorage.getItem('username');
  const { data, loading, error } = useQuery(GET_USER, { variables: { username } });
  const [formData, setFormData] = useState({ full_name: '', email: '', username: '', role: '' });
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

  useEffect(() => {
    if (data) {
      const user = data.users[0];
      setFormData({
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        role: user.role,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ variables: { ...formData } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-1/3 p-4 border border-lime-900">
        <h1 className="text-xl mb-4 font-bold text-center">Profile</h1>
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
            <label htmlFor="role" className="w-1/3 mr-2 text-left">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-md p-2 w-2/3"
              disabled
            />
          </div>
          <button className="bg-lime-600 px-6 py-2 text-white text-center hover:bg-lime-500">
            Save Updates
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
