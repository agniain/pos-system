import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignUpPage from './pages/register';
import LogInPage from './pages/login';
import ProductOrder from "./pages/product-order";
import History from "./pages/daily-order-history";
import Report from "./pages/report";
import Product from "./pages/product-page";
import ProfilePage from './pages/profile-page';

const App = () => {
    return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/history" element={<History />} />
        <Route path="/product" element={<Product />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;