import React from 'react';
import OrderHistory from '../components/daily-order-history';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

const DailyReport = () => { 
  return (
    <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <OrderHistory />
        </div>
        <Footer />
    </>
  );
};

export default DailyReport;