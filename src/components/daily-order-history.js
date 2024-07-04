import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDER_HISTORY } from '../graphql/queries';
import { format, startOfDay, endOfDay } from 'date-fns';


const OrderHistory = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const { data, loading, error } = useQuery(GET_ORDER_HISTORY, {
    variables: {
      startDate: startOfDay(today).toISOString(),
      endDate: endOfDay(today).toISOString(),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calculateTotal = (orderDetails) => {
    return orderDetails.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="w-5/6 p-4">
      <h2 className="text-2xl text-amber-900 font-bold">Order History</h2>
      <div className="flex space-x-4 mb-5">
        <input
          type="date"
          value={format(startDate, 'yyyy-MM-dd')}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="border p-2"
        />
        <input
          type="date"
          value={format(endDate, 'yyyy-MM-dd')}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="border p-2"
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-lime-600 text-white">
          <th className="border p-2">No</th>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody className="text-amber-900">
          {data.orders.map((order, index) => (
            <tr key={order.id}>
              <td className="border p-2 border-lime-700">{index + 1}</td>
              <td className="border p-2 border-lime-700">{order.id}</td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>{product.product.name}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>Rp {product.product.price}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>{product.quantity}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                Rp {calculateTotal(order.order_details)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
