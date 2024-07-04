import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import IncomeChart from '../components/report-income';
import SoldProductChart from '../components/report-product';
import Footer from '../components/footer';

const ReportPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">          
        <Sidebar />
        <div className="w-5/6">
          <div className="flex flex-col space-y-4">
            <IncomeChart />
            <SoldProductChart />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;

