import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './AdminDashboard.css';
import { ProductContext } from '../../contexts/ProductContext';
import ProductsPage from '../ProductsPage/ProductsPage';
import UsersList from './adminComponents/UsersList';
import { useNavigate } from 'react-router-dom';
import OrdersList from './adminComponents/OrdersList';
const AdminDashboard = () => {
  const { isAdmin } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const [showCustomers, setShowCustomers] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin()) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
      const timeout = setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAdmin, navigate]);
  const handleOptionClick = (showCust, showOrd, showProd) => {
    setShowCustomers(showCust);
    setShowOrders(showOrd);
    setShowProducts(showProd);
  };
  return (
    <div className="admin_page">
      {isAdmin() && (
        <div>
          <h1>ADMIN PANEL</h1>
          <div className="admin_panel">
            <button
              className={`customer_btn ${showCustomers ? 'selected' : ''}`}
              onClick={() => handleOptionClick(true, false, false)}
            >
              Customers
              <span className="counter">{usersCount}</span>
            </button>
            <button
              className={`orders_btn ${showOrders ? 'selected' : ''}`}
              onClick={() => handleOptionClick(false, true, false)}
            >
              Orders
              <span className="counter">{ordersCount}</span>
            </button>
            <button
              className={`products_btn ${showProducts ? 'selected' : ''}`}
              onClick={() => handleOptionClick(false, false, true)}
            > 
              Products
              <span className="counter">{products.length}</span>
            </button>
          </div>
        </div>
      )}
      {showCustomers && <UsersList setUsersCount={setUsersCount} />}
      {showOrders && <OrdersList setOrdersCount={setOrdersCount} />}
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
