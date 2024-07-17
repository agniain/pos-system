import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';

const ProfilePage = () => { 
  return (
    <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Profile />
        </div>
        <Footer />
    </>
  );
};

export default ProfilePage;