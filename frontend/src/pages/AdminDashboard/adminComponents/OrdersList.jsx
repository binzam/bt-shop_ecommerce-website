/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import './users-orders.css';
import ConfirmationPopup from './ConfirmationPopup';
import SuccessPopup from './SuccessPopup';

const OrdersList = ({ setOrdersCount }) => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/orders', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      setOrders(data.allOrders);
      setOrdersCount(data.orderCount);
    } catch (error) {
      console.error(error);
    }
  }, [user, setOrdersCount]);
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);
  const handleRemoveOrder = (orderId) => {
    setOrderId(orderId);
    setShowConfirmationPopup(true);
  };
  const removeOrder = async (orderId) => {
    setShowSuccessPopup(false);
    setShowConfirmationPopup(false);
    setError(null);
    axios
      .delete(`http://localhost:5555/api/orders/remove_order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.orderRemoveSuccess) {
          setShowSuccessPopup(true);
          setError(null);
        }
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
        fetchOrders();
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="orders">
      {showConfirmationPopup && (
        <ConfirmationPopup
          type="Order"
          id={orderId}
          remove={removeOrder}
          close={setShowConfirmationPopup}
        />
      )}
      {showSuccessPopup && <SuccessPopup />}
      {error && <div className="form_error">{error}</div>}

      <ul className="orders_list">
        {Array.isArray(orders) &&
          orders.map((order) => (
            <li key={order._id} className="order">
              <div>
                Order ID: <span className="highlight">{order._id}</span>
              </div>
              <div>
                Customer ID: <span className="highlight">{order.user}</span>
              </div>
              <div>Ordered Prodcuts</div>
              <div className="order_information">
                {Array.isArray(order.orders) &&
                  order.orders.map((prd) => (
                    <div key={prd._id}>
                      Product <span>[{prd.quantity}]</span>{' '}
                      <span className="highlight">{prd.product}</span>
                    </div>
                  ))}
                <div>
                  Total Amount:{' '}
                  <span className="highlight">{order.totalAmount}</span>
                </div>
              </div>
              <button
                className="remove_order_btn"
                onClick={() => handleRemoveOrder(order._id)}
              >
                Remove Order
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrdersList;
