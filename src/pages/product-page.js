import React from 'react';
import DailyProduct from '../components/products';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

const ProductPage = () => { 
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

export default ProductPage;