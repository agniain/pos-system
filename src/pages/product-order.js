import React, { useState } from 'react';
import ProductSection from '../components/product-section';
import CartSection from '../components/cart-section';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS, GET_TOTAL_CART_PRICE } from '../graphql/queries';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

const ProductAndCart = () => {
  const {authToken}= useState(localStorage.getItem('authToken'));
  const { data: cartData, refetch: refetchCart } = useQuery(GET_CART_ITEMS);
  const { data: totalCartPriceData, refetch: refetchTotalCartPrice } = useQuery(GET_TOTAL_CART_PRICE);

  return (
    <>
      <Navbar authToken={authToken} />
      <div className="flex bg-lime-50 bg-opacity-25">
        <Sidebar />
        <div className="w-3/6 p-4">
          <ProductSection
            refetchCart={refetchCart}
            refetchTotalCartPrice={refetchTotalCartPrice}
            cartData={cartData}
          />
        </div>
        <div className="w-2/6 p-4">
          <CartSection
            cartData={cartData}
            refetchCart={refetchCart}
            totalCartPriceData={totalCartPriceData}
            refetchTotalCartPrice={refetchTotalCartPrice}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductAndCart;

