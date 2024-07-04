import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignUpPage from './pages/register';
import LogInPage from './pages/login';
import ProductOrder from "./pages/product-order";
import History from "./pages/daily-order-history";
import Report from "./pages/report";
import DailySoldProduct from "./pages/daily-sold-product";

const App = () => {
    return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/history" element={<History />} />
        <Route path="/daily-product" element={<DailySoldProduct />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
};

export default App;