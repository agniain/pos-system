import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useQuery } from '@apollo/client';
import { GET_All_SOLD_PRODUCTS } from '../graphql/queries';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SoldProductChart = () => {
  const today = new Date();
  const defaultStartDate = subDays(today, 6);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(today);

  const { data, loading, error } = useQuery(GET_All_SOLD_PRODUCTS, {
    variables: {
      startDate: startOfDay(startDate).toISOString(),
      endDate: endOfDay(endDate).toISOString(),
    },
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const soldQuantities = data.order_detail.reduce((acc, item) => {
        acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
        return acc;
      }, {});

      const labels = data.products.map(product => product.name);
      const quantities = data.products.map(product => soldQuantities[product.id] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Quantity Sold',
            data: quantities,
            backgroundColor: 'rgba(178, 233, 177, 1)',
          },
        ],
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-5/6 p-5">
      <h2 className="text-amber-900 font-bold text-4xl mb-5">Sold Products</h2>
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
      {chartData ? <Bar data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default SoldProductChart;