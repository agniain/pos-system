import React, { useEffect } from 'react';
import ProductSection from '../components/product-section';
import CartSection from '../components/cart-section';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS, GET_TOTAL_CART_PRICE, GET_USER } from '../graphql/queries';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import useAuth from '../config';

const ProductAndCart = () => {
  const { authToken } = useAuth();
  const username = localStorage.getItem('username');

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { username: username },
  });
  const { data: cartData, refetch: refetchCart } = useQuery(GET_CART_ITEMS);
  const { data: totalCartPriceData, refetch: refetchTotalCartPrice } = useQuery(GET_TOTAL_CART_PRICE);

  useEffect(() => {
    if (!username) {
      console.error('Username is not available');
    }
  }, [username]);

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;

  const user = userData?.users[0];

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
            user={user}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductAndCart;