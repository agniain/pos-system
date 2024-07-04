import React from 'react';
import DailyProduct from '../components/daily-product';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

const DailySoldProduct = () => { 
  return (
    <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <DailyProduct />
        </div>
        <Footer />
    </>
  );
};

export default DailySoldProduct;