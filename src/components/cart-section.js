import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER, MOVE_CART_TO_ORDER_DETAIL, REMOVE_FROM_CART } from '../graphql/mutations';

const CartSection = ({ cartData, totalCartPriceData, refetchCart, refetchTotalCartPrice, user }) => {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    refetchCart();
    refetchTotalCartPrice();
  }, [refetchCart, refetchTotalCartPrice]);

  const totalCartPrice = totalCartPriceData?.cart_with_total_price_aggregate?.aggregate?.sum?.total_cart_price;

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => {
      refetchCart();
      refetchTotalCartPrice();
    },
  });

  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      setOrderId(data.insert_orders_one.id);
    },
  });

  const [moveCartToOrderDetail] = useMutation(MOVE_CART_TO_ORDER_DETAIL, {
    onCompleted: () => {
      refetchCart();
      refetchTotalCartPrice();
      setOrderId(null);
    },
  });

  const handleRemoveFromCart = (cartItemId) => {
    removeFromCart({
      variables: { _eq: cartItemId },
    });
  };

  const handleCreateOrder = () => {
    if (user && user.id) {
      createOrder({ variables: { user_id: user.id } });
    } else {
      console.error('User data is not available');
    }
  };

  const handleCompleteOrder = () => {
    if (orderId && cartData?.cart[0]?.cart_products.length > 0) {
      const items = cartData.cart[0].cart_products.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const stockUpdates = cartData.cart[0].cart_products.map((item) => ({
        where: { id: { _eq: item.product_id } },
        _inc: { stock: -item.quantity },
      }));

      moveCartToOrderDetail({
        variables: {
          items,
          stockUpdates,
        },
      });
    }
  };

  return (
    <div className="flex-2/6 p-4">
      <h2 className="text-2xl mb-4 text-amber-900 font-bold">Cart</h2>
      <div className="border p-4">
        <p className="text-amber-900">Date: {new Date().toLocaleDateString('en-GB')} ({new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })})</p>
        <div className="mt-2 mb-2">
          <div className="flex justify-between font-semibold border-b pb-2 text-amber-900">
            <div>Name</div>
            <div>Price</div>
            <div>Qty</div>
            <div className="mr-5">Total</div>
          </div>
          {cartData?.cart[0]?.cart_products.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-1 text-sm text-amber-900">
              <div>{item.product.name}</div>
              <div>Rp {item.product.price}</div>
              <div>{item.quantity}</div>
              <div>Rp {item.product.price * item.quantity}</div>
              <button
                className="bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-700"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                x
              </button>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-amber-900 border-t pt-2 mt-2">
            <div>Total</div>
            <div>Rp {totalCartPrice}</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {!orderId ? (
          <button
            className="bg-amber-800 text-white p-2 hover:bg-orange-700 w-full mb-2"
            onClick={handleCreateOrder}
          >
            Create Order
          </button>
        ) : (
          <button
            className="bg-lime-600 text-white p-2 hover:bg-lime-700 w-full"
            onClick={handleCompleteOrder}
          >
            Complete Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSection;