import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/6 p-4 bg-amber-50 bg-opacity-50 h-screen border border-x-amber-700">
      <ul className="space-y-2">
        <li>
          <Link to="/order" className="text-amber-900 font-bold mb-5 hover:underline">Order</Link>
        </li>
        <li>
          <Link to="/history" className="text-amber-900 font-bold mb-5 hover:underline">Order History</Link>
        </li>
        <li>
          <Link to="/daily-product" className="text-amber-900 font-bold mb-5 hover:underline">Sold Product</Link>
        </li>
        <li>
          <Link to="/report" className="text-amber-900 font-bold mb-5 hover:underline">Report</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
