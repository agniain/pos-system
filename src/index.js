import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import { ApolloProvider } from '@apollo/client';
import client from './Apollo';
import Register from './pages/sign-up-page';
import Login from './pages/log-in-page';
import ProductOrder from './pages/product-order';
import History from './pages/daily-order-history';
import Report from './pages/report';
import ProfilePage from './pages/profile-page';
import ProductPage from './pages/product-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/order",
    element: <ProductOrder />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
