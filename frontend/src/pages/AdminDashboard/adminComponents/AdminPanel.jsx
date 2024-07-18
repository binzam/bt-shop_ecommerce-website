/* eslint-disable react/prop-types */

import { useState } from 'react';

const AdminPanel = ({ currentView, onViewChange }) => {
  const [activeView, setActiveView] = useState(currentView);

  const handleViewChange = (view) => {
    setActiveView(view);
    onViewChange(view);
  };
  return (
    <div className="admin_panel">
      <button
        className={`customer_btn ${
          activeView === 'customers' ? 'selected' : ''
        }`}
        onClick={() => handleViewChange('customers')}
      >
        Customers
      </button>
      <button
        className={`orders_btn ${activeView === 'orders' ? 'selected' : ''}`}
        onClick={() => handleViewChange('orders')}
      >
        Orders
      </button>
      <button
        className={`products_btn ${
          activeView === 'products' ? 'selected' : ''
        }`}
        onClick={() => handleViewChange('products')}
      >
        Products
      </button>
    </div>
  );
};

export default AdminPanel;
