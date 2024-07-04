import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_SALES_AND_STOCK } from '../graphql/queries';
import { format, startOfDay, endOfDay } from 'date-fns';

const DailyProduct = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const { data, loading, error } = useQuery(GET_PRODUCT_SALES_AND_STOCK, {
    variables: {
      startDate: startOfDay(today).toISOString(),
      endDate: endOfDay(today).toISOString(),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const salesData = data.orders.reduce((acc, order) => {
    order.order_details.forEach((detail) => {
      const product = detail.product;
      if (!acc[product.id]) {
        acc[product.id] = {
          ...product,
          quantitySold: 0,
        };
      }
      acc[product.id].quantitySold += detail.quantity;
    });
    return acc;
  }, {});

  return (
    <div className="w-5/6 p-4">
      <h2 className="text-2xl text-amber-900 font-bold">Sold Products</h2>
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
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity Sold</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody className="text-amber-900">
          {Object.values(salesData).map((product, index) => (
            <tr key={product.id}>
              <td className="border p-2 border-lime-700">{index + 1}</td>
              <td className="border p-2 border-lime-700">{product.name}</td>
              <td className="border p-2 border-lime-700">Rp {product.price}</td>
              <td className="border p-2 border-lime-700">{product.quantitySold}</td>
              <td className="border p-2 border-lime-700">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyProduct;
