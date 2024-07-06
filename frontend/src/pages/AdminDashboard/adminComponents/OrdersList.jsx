/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';

const OrdersList = ({ setOrdersCount }) => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [removeSuccessMessage, setRemoveSuccessMessage] = useState(null);
  const handleRemoveOrder = async (orderId) => {
    setRemoveSuccessMessage(null);
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/orders/remove/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data.orderRemoveSuccess) {
        setRemoveSuccessMessage(response.data.message);
      }
    } catch (error) {
      setRemoveSuccessMessage(null);
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.data.data;
        setOrdersCount(response.data.orderCount);
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user, setOrdersCount]);
  return (
    <div className="orders">
      <ul className="orders_list">
        {orders &&
          orders.map((order) => (
            <li key={order._id} className="order">
              <div>Order ID: [ {order._id} ]</div>
                <button
                  className="remove_order_btn"
                  onClick={() => handleRemoveOrder(order._id)}
                >
                  Remove Order
                </button>
              {removeSuccessMessage && <div>{removeSuccessMessage}</div>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrdersList;
