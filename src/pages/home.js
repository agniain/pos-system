import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';
import HomeContent from '../components/home-content';

const Home = () => { 
  return (
    <>
        <Navbar/>
        <Header />
        <HomeContent />
        <Footer />
    </>
  );
};

export default Home;