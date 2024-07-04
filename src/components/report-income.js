import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from 'date-fns';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GET_DAILY_INCOME } from '../graphql/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeChart = () => {
  const today = new Date();
  const defaultStartDate = subDays(today, 6);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(today);

  const { data, loading, error } = useQuery(GET_DAILY_INCOME, {
    variables: {
      startDate: format(startOfDay(startDate), 'yyyy-MM-dd'),
      endDate: format(endOfDay(endDate), 'yyyy-MM-dd'),
    },
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const incomeData = {};
      const allDates = eachDayOfInterval({ start: startDate, end: endDate });

      data.daily_income.forEach(income => {
        const date = format(new Date(income.order_date), 'yyyy-MM-dd');
        incomeData[date] = income.total_income;
      });

      const sortedDates = allDates.map(date => format(date, 'yyyy-MM-dd'));
      const incomeValues = sortedDates.map(date => incomeData[date] || 0);

      setChartData({
        labels: sortedDates,
        datasets: [
          {
            label: 'Total Daily Income',
            data: incomeValues,
            borderColor: 'rgba(217, 196, 161, 1)',
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(217, 196, 161, 1)',
          },
        ],
      });
    }
  }, [data, startDate, endDate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5 w-4/6">
      <h4 className="text-amber-900 font-bold text-4xl mb-5">Income</h4>
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
      {chartData ? <Line data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default IncomeChart;