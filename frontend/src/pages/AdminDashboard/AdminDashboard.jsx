import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './AdminDashboard.css';
import { ProductContext } from '../../contexts/ProductContext';
import ProductsPage from '../ProductsPage/ProductsPage';
import UsersList from './adminComponents/UsersList';
import { useNavigate } from 'react-router-dom';
import OrdersList from './adminComponents/OrdersList';
import useUsers from '../../hooks/useUsers';
import useOrders from '../../hooks/useOrders';

const AdminDashboard = () => {
  const { isAdmin, user } = useContext(AuthContext);
  const { users, updateUsers } = useUsers(user);
  const { orders, updateOrders } = useOrders(user);
  const { products } = useContext(ProductContext);
  const [showCustomers, setShowCustomers] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && isAdmin()) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
      const timeout = setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAdmin, navigate, user]);

  const handleOptionClick = (showCust, showOrd, showProd) => {
    setShowCustomers(showCust);
    setShowOrders(showOrd);
    setShowProducts(showProd);
  };
  const renderAdminPanel = () => {
    return (
      <div className="admin_panel">
        <button
          className={`customer_btn ${showCustomers ? 'selected' : ''}`}
          onClick={() => handleOptionClick(true, false, false)}
        >
          Customers
          <span className="counter">{users.length - 1}</span>
        </button>
        <button
          className={`orders_btn ${showOrders ? 'selected' : ''}`}
          onClick={() => handleOptionClick(false, true, false)}
        >
          Orders
          <span className="counter">{orders.length}</span>
        </button>
        <button
          className={`products_btn ${showProducts ? 'selected' : ''}`}
          onClick={() => handleOptionClick(false, false, true)}
        >
          Products
          <span className="counter">{products.length}</span>
        </button>
      </div>
    );
  };
  return (
    <div className="admin_page">
      {isAdmin() && (
        <div>
          <h1>ADMIN PANEL</h1>
          {renderAdminPanel()}
        </div>
      )}
      {showCustomers && <UsersList user={user} updateUsers={updateUsers} />}
      {showOrders && <OrdersList user={user} updateOrders={updateOrders} />}
      {showProducts && <ProductsPage />}
      {showPopup && (
        <div className="not_admin">
          YOU ARE NOT AUTHORIZED! <br />
          <small>You will be redirected to HomePage</small>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
